import { RequestHandler } from "express";
import { File } from "formidable";
import fs from "fs"

import nodeFetch from "node-fetch";
import { createClient } from "webdav";

import { Quote } from "../../models/quoteModel";
import { Person } from "../../types/person";
import { getPerson, hoursToSeconds } from "../../util";


export const addQuote: RequestHandler = async (req, res) => {
    const secret_key = process.env.RECAPTCHA_KEY;
    const token = req.body.recaptchaToken;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    try {
        let response = await nodeFetch(url, {
            method: "post"
        })
        let data = []
        data = await response.json()
        if (data["success"] 
        && data["success"] > 0.5 
        && req.fields
        && req.fields.class
        && req.fields.text
        && req.fields.submittedBy
        && req.fields.class != "" 
        && req.fields.text != "" 
        && req.body.submittedBy != "") {//now this is input verification ._.
        let result = await Quote.create({
            class: req.body.class || "",
            date: Date.now(),
            text: req.body.text || "",
            submittedBy: req.body.submittedBy || ""
        });
        res.redirect(result ? `/quote/${result.id}` : "/add?err=true");
    }
    } catch (error) {
        res.redirect("/add?err=true");
    }
};

export const submitCode: RequestHandler = async (req, res) => {
    if (!req.fields || !req.fields.code) {
        res.redirect("/char?err=true")
        return;
    }
    res.cookie("code", req.fields!.code,
        {
            maxAge: hoursToSeconds(24),
            httpOnly: true,
            secure: process.env.NODE_ENV === "TRUE" ? true : false
        }
    );
    res.redirect("/char/upload")
};

export const addCharFile: RequestHandler = async (req, res) => {
    let person: Person | null
    let filename = ""
    let file: File | null
    
    let client = createClient(
        `http://nextcloud/remote.php/dav/files/${process.env.NEXTCLOUD_BOT_USERNAME}`,
        {
            username: process.env.NEXTCLOUD_BOT_USERNAME!,
            password: process.env.NEXTCLOUD_BOT_PASSWORD!
        }
    )

    try {
        if (!(person = getPerson(req.cookies.code)) || !req.files || !(await client.exists(process.env.CHAR_FOLDER!))) {
            throw "Code wasn't found, no files uploaded or nextcloud folder does not exist"
        }
        
        filename = process.env.CHAR_FOLDER + "/" + person!.name.replace(" ", "_") + ".pdf"
        file = req.files.char as File
    
        await client.putFileContents(filename, fs.createReadStream(file.filepath), { overwrite: true })
    
        fs.unlink(file.filepath, () => {})
    } catch (err) {
        res.redirect("/char/upload?err=true")
        return
    }
    res.redirect("/char/upload?succ=true")
};
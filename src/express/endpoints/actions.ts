import { RequestHandler } from "express";
import fs from "fs"

import nodeFetch from "node-fetch";
import { createClient } from "webdav";
import { File } from "formidable";

import { Quote } from "../../models/quoteModel";
import { Person } from "../../types/person";
import { getPerson, hoursToSeconds } from "../../util";
import { validateQuote } from "../../validators/quote";
import { validateCode } from "../../validators/code";


export const addQuote: RequestHandler = async (req, res) => {
    if (!validateQuote(req.fields)) {
        res.redirect("/quotes/add?err=true");
        return
    }
    try {
        let secret_key = process.env.RECAPTCHA_KEY;
        let url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${req.fields!.recaptchaToken}`;
        let data = await (await nodeFetch(url, {
            method: "post"
        })).json()
        if (!data.success || data.success < 0.5) { throw "Failed ReCaptcha!"}
        let result = await Quote.create({
            class: req.fields!.class || "",
            date: Date.now(),
            text: req.fields!.text || "",
            submittedBy: req.fields!.submittedBy || ""
        });
        res.redirect(`/quotes/quote/${result.id}`);
    } catch (error) {
        res.redirect("/quotes/add?err=true");
    }
};

export const submitCode: RequestHandler = async (req, res) => {
    if (!validateCode(req.fields)) {
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
    if (!validateCode(req.cookies) || !req.files) {
        res.redirect("/char?err=true")
        return;
    }

    let client = createClient(
        `http://nextcloud/remote.php/dav/files/${process.env.NEXTCLOUD_BOT_USERNAME}`,
        {
            username: process.env.NEXTCLOUD_BOT_USERNAME!,
            password: process.env.NEXTCLOUD_BOT_PASSWORD!
        }
    )

    try {
        if (!(person = getPerson((req.cookies as any).code)) || !(await client.exists(process.env.CHAR_FOLDER!))) {
            throw "Code wasn't found or nextcloud folder does not exist"
        }

        let filename = process.env.CHAR_FOLDER + "/" + person!.name.replace(" ", "_") + ".pdf"
        let file = req.files.char as File

        await client.putFileContents(filename, fs.createReadStream(file.filepath), { overwrite: true })

        fs.unlink(file.filepath, () => { })
        res.redirect("/char/upload?succ=true")
    } catch (err) {
        console.log(`err in endpoint: ${err}`)
        console.log(req.cookies)
        console.log(req.cookies as any)
        res.redirect("/char/upload?err=true")
    }
};
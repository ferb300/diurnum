import { RequestHandler } from "express";

import nodeFetch from "node-fetch";

import { Quote } from "../../models/quoteModel";
import { getPerson, hoursToSeconds } from "../../util";


export const addQuote: RequestHandler = async (req, res) => {
    const secret_key = process.env.RECAPTCHA_KEY;
    const token = req.body.recaptchaToken;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
    let response = await nodeFetch(url, {
        method: 'post'
    });
    let data = [];
    try {
        data = await response.json();
    } catch (error) {
        return;
    }

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
    } else {
        res.redirect("/add?err=true");
    }
};

export const submitCode: RequestHandler = async (req, res) => {
    // TODO: check code
    if (!req.fields || !req.fields.code) {
        res.redirect("/char?err=true")
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
    if (!getPerson(req.cookies.code)) {
        res.redirect("/char?err=true")
        return
    }
    if (req.files) {
        res.redirect("/char/upload?succ=true")
    } else {
        res.redirect("/char/upload?err=true")
    }
};
import { RequestHandler } from "express";

import formidable from "formidable";
import nodeFetch from "node-fetch";

import { Quote } from "../../models/quoteModel";


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

    if (data["success"] && data["success"] > 0.5 && req.body.class != "" && req.body.text != "" && req.body.submittedBy != "") {//now this is input verification ._.
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
        res.send("no")
        // TODO: error message
    }
    res.cookie("code", req.fields!.code,
        {
            maxAge: 24 * 60 * 60,
            // You can't access these tokens in the client's javascript
            httpOnly: true,
            // Forces to use https in production
            secure: process.env.NODE_ENV === "TRUE" ? true : false
        }
    );
    res.redirect("/char/upload")
};

export const addCharFile: RequestHandler = async (req, res) => {

};
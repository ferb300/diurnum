import { RequestHandler } from "express";
import { Quote } from "../../models/quoteModel";
import nodeFetch from "node-fetch";

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

export const addCharFile: RequestHandler = async (req, res) => {

};
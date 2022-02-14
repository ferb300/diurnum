import { RequestHandler } from "express";
import { Quote } from "../models/quoteModel";
import nodeFetch from "node-fetch";
import * as classes from "../data/classes.json";

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

export const getQuote: RequestHandler = async (req, res) => {
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
        res.redirect("/all");
    } else {
        res.render("quote", {
            quote: quote
        });
    }
};

export const renderAdd: RequestHandler = async (req, res) => {
    res.render("add", {
        classes: classes,
        error: req.query.err ? true : false
    });
};

export const renderAll: RequestHandler = async (req, res) => {
    let quotes = await Quote.find({});
    //only the newest quotes
    quotes = quotes.sort((a,b) => {
        return a.get("date") > b.get("date") ? -1 : 1;
    });

    res.render("all", {
        quotes: quotes
    });
};

export const renderOverview: RequestHandler = async (req, res) => {
    res.render("overview");
};

export const renderCodeForm: RequestHandler = async(req, res) => {
    res.render("code");
};

export const renderUploadForm: RequestHandler = async(req, res) => {
    res.render("upload");
};
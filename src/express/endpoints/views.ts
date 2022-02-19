import { RequestHandler } from "express";

import { Quote } from "../../models/quoteModel";
import * as classes from "../../data/classes.json";
import { getPerson } from "../../util";


export const renderQuote: RequestHandler = async (req, res) => {
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
        res.redirect("/all");
    } else {
        res.render("quotes/quote", {
            quote: quote
        });
    }
};

export const renderAdd: RequestHandler = async (req, res) => {
    res.render("quotes/add", {
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

    res.render("quotes/all", {
        quotes: quotes
    });
};

export const renderOverview: RequestHandler = async (req, res) => {
    res.render("overview");
};

export const renderCodeForm: RequestHandler = async(req, res) => {
    res.render("chars/code", {
        error: req.query.err ? true : false
    });
};

export const renderUploadForm: RequestHandler = async(req, res) => {
    let person = getPerson(req.cookies.code)
    if (!person) {
        res.redirect("/char?err=true")
        return;
    }
    res.render("chars/add", {
        name: person!.name,
        error: req.query.err ? true : false,
        success: req.query.succ ? true : false,
        max_upload: process.env.MAX_MB_UPLOAD || 1
    });
};
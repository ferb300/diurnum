import { RequestHandler } from "express";
import { Quote } from "../models/quoteModel";
import * as classes from "../data/classes.json";

export const addQuote: RequestHandler = async (req, res) => {
    let result = await Quote.create({
        class: req.body.class || "",
        date: req.body.date || "",
        text: req.body.text || "",
        submittedBy: req.body.submittedBy || ""
    });
    res.status(200).json({ success: result ? true : false});
};

//unpaginated debug shit will be removed before release
export const getQuotes: RequestHandler = async (req, res) => {
    let quotes = await Quote.find({});
    res.status(200).json({ quotes: quotes });
};

export const renderAdd: RequestHandler = async (req, res) => {
    console.log(classes);
    res.render("add", {
        classes: classes
    });
};
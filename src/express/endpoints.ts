import { RequestHandler } from "express";
import { Quote } from "../models/quoteModel";
import * as classes from "../data/classes.json";

export const addQuote: RequestHandler = async (req, res) => {
    let result = await Quote.create({
        class: req.body.class || "",
        date: Date.now(),
        text: req.body.text || "",
        submittedBy: req.body.submittedBy || ""
    });
    res.redirect(result ? "/add" : "/add?err=true");
};

export const renderAdd: RequestHandler = async (req, res) => {
    res.render("add", {
        classes: classes
    });
};

export const renderAll: RequestHandler = async (req, res) => {
    let quotes = await Quote.find({});
    res.render("all", {
        quotes: quotes
    });
};

export const renderOverview: RequestHandler = async (req, res) => {
    res.render("overview");
};
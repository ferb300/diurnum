import { RequestHandler } from "express";

export const addQuote: RequestHandler = async (req, res) => {
    res.status(200).send();
};

export const getQuotes: RequestHandler = async (req, res) => {
    res.status(200).send();
};
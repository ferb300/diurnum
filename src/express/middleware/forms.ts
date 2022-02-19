import express from "express";

import formidable from "formidable";

export default function forms(req: express.Request, res: express.Response, next: Function) {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        req.fields = fields
        req.files = files
        next()
    });
}
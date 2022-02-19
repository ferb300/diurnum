import express from "express";

import formidable from "formidable";

import { megabyteToByte } from "../../util";

export default function forms(req: express.Request, res: express.Response, next: Function) {
    const form = new formidable.IncomingForm({ 
        multiples: false,
        maxFileSize: megabyteToByte(parseInt(process.env.MAX_MB_UPLOAD || "1")),
        filter: function (part) {
            return (part.mimetype || "").includes("pdf")
        }
     });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next();
        }
        req.fields = fields
        req.files = files
        next()
    });
}
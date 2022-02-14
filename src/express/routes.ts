import express, { Router } from "express";
import { addQuote, getQuote, renderAdd, renderAll, renderCodeForm, renderOverview, renderUploadForm } from "./endpoints";

export const dbRoutes = Router();
export const viewRoutes = Router();

dbRoutes.post("/addQuote", addQuote);

viewRoutes.get("/add", renderAdd);
viewRoutes.get("/all", renderAll);
viewRoutes.get("/quote/:id", getQuote);
viewRoutes.get("/", renderOverview);
viewRoutes.get("/char", renderCodeForm);
viewRoutes.get("/char/:code", renderUploadForm);
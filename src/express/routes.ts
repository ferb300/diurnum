import express, { Router } from "express";
import { addQuote } from "./endpoints/actions";
import { renderAdd, renderAll, renderCodeForm, renderOverview, renderQuote, renderUploadForm } from "./endpoints/views";

export const actionRoutes = Router();
export const viewRoutes = Router();

viewRoutes.get("/", renderOverview);

viewRoutes.get("/quotes/add", renderAdd);
viewRoutes.get("/quotes/all", renderAll);
viewRoutes.get("/quotes/quote/:id", renderQuote);

viewRoutes.get("/char", renderCodeForm);
viewRoutes.get("/char/:code", renderUploadForm);

//actionRoutes.get("/submitChar", null);
actionRoutes.post("/addQuote", addQuote);
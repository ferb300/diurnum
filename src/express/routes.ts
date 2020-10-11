import express, { Router } from "express";
import { addQuote, getQuotes, renderAdd } from "./endpoints";

export const dbRoutes = Router();
export const viewRoutes = Router();

dbRoutes.post("/addQuote", addQuote);
dbRoutes.get("/getQuotes", getQuotes);

viewRoutes.get("/add", renderAdd)
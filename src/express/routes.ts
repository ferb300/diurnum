import express, { Router } from "express";
import { addQuote, getQuotes } from "./endpoints";

export const dbRoutes = Router();
export const viewRoutes = Router();

dbRoutes.post("/addQuote", addQuote);
dbRoutes.get("/getQuotes", getQuotes);
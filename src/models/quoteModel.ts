import mongoose from "mongoose";

const quoteScheme = new mongoose.Schema({
  class: {
    type: String
  },
  date: {
    type: Date
  },
  text: {
    type: String
  },
  submittedBy: {
    type: String
  }
});

export const Quote = mongoose.model("quote", quoteScheme);
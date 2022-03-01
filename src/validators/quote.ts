import Ajv from "ajv"

let ajv = new Ajv()

let quoteSchema = {
    type: "object",
    properties: {
        class: { type: "string", minLength: 1 },
        text: { type: "string", minLength: 1 },
        submittedBy: { type: "string", minLength: 1 },
        recaptchaToken: { type: "string", minLength: 1 },
    },
    required: ["class", "text", "submittedBy", "recaptchaToken"]
}

export const validateQuote = ajv.compile(quoteSchema)
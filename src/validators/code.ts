import Ajv from "ajv"

let ajv = new Ajv()

let codeSchema = {
    type: "object",
    properties: {
        code: { type: "string", minLength: 1 },
    },
    required: ["code"]
}

export const validateCode = ajv.compile(codeSchema)
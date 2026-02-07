import { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";

import { isNumberDateTextFormat, isTimeTextFormat } from "../utils/datetime-utils";

export const validateRequestContent = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
            req.reqBody = schema.parse(req.body);
        } else if (req.method == "GET") {
            req.reqBody = schema.parse(req.query);
        } else {
            console.log(`Unknow HTTP method: ${req.method}`);
        }
        next();
    } catch (err) {
        console.log(err);
        console.log(`req.body:`);
        console.log(req.body);
        console.log(`req.query:`);
        console.log(req.query);
        next(err);
    }
};

export const NullableString = z.string().optional().nullable();
export const NullableStringNonEmpty = z
    .string()
    .optional()
    .nullable()
    .refine((value) => value !== "");

export const DateTextWithFormat = z.string().refine((value) => isNumberDateTextFormat(value), {
    message: "Invalid date format. Expected format: 'DD-MM-YYYY', e.g. '25-12-2023', '01-02-2011'",
});

export const TimeTextWithFormat = z.string().refine((value) => isTimeTextFormat(value), {
    message: "Invalid time format. Expected format: 'HH:MM', e.g. '09:30', '23:59'",
});

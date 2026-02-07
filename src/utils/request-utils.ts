import { Request } from "express";

// middleware to log all requests
const sanitizeRequestBody = (body: { [key: string]: any }) => {
    let result: { [key: string]: any } = {};
    let prohibitedKeys = ["magic"];
    for (let [key, value] of Object.entries(body)) {
        if (!prohibitedKeys.includes(key)) {
            result[key] = value;
        }
    }
    return result;
};

export const logRequestMiddleware = () => {
    return async (req: any, res: any, next: any) => {
        await logRequest(req);
        next();
    };
};

export const logRequest = async (req: Request) => {
    if (req.method == "POST") {
        console.log(
            `POST ${req.originalUrl} ${new Date().toISOString()}, req.body: ${JSON.stringify(sanitizeRequestBody(req.body))}`
        );
    }
    if (req.method == "GET") {
        console.log(
            `GET ${req.originalUrl} ${new Date().toISOString()}, req.query: ${JSON.stringify(sanitizeRequestBody(req.query))}`
        );
    }
    if (req.method === "PUT") {
        console.log(
            `PUT ${req.originalUrl} ${new Date().toISOString()}, req.query: ${JSON.stringify(
                sanitizeRequestBody(req.query)
            )}, req.body: ${JSON.stringify(sanitizeRequestBody(req.body))}, req.params: ${JSON.stringify(
                sanitizeRequestBody(req.params)
            )}`
        );
    }
    if (req.method === "DELETE") {
        console.log(
            `DELETE ${req.originalUrl} ${new Date().toISOString()}, req.params: ${JSON.stringify(sanitizeRequestBody(req.params))}`
        );
    }
    console.log();
};

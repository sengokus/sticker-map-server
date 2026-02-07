import { v4 as uuidv4 } from "uuid";

export const uuid = () => {
    return uuidv4();
};

export const uuidv4WithoutDash = () => {
    return uuidv4().replace(/-/g, "");
};

export const uniqueUid = (length = 32) => {
    const timestampLength = 13;
    const characterNeeded = length - timestampLength;
    const eachUuidLength = 32;
    const uuidNeeded = Math.ceil((characterNeeded * 1.0) / eachUuidLength);
    let uuid = "";
    for (let i = 0; i < uuidNeeded; i++) {
        uuid = `${uuid}${uuidv4WithoutDash()}`;
    }
    let timestamp = new Date().getTime().toString();
    let reversedTimestamp = reverseString(timestamp);
    let result = [];
    let index = 0;
    do {
        if (result.length < length && index < reversedTimestamp.length) {
            result.push(reversedTimestamp.charAt(index));
        }
        if (result.length < length && index < uuid.length) {
            result.push(uuid.charAt(index));
        }
        index++;
    } while (result.length < length);
    let uniqueId = result.join("");
    return uniqueId;
};

export type GenerateShortIdOptions =
    | {
          overrideCharacters?: string;
      }
    | undefined;
export const generateRandomShortId = (length: number, options?: GenerateShortIdOptions) => {
    const defaultChars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Default Excludes I, O, 1, 0
    const validCharacters = options?.overrideCharacters ?? defaultChars;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validCharacters.length);
        randomId += validCharacters[randomIndex];
    }
    return randomId;
};

const reverseString = (str: string) => {
    return str.split("").reverse().join("");
};

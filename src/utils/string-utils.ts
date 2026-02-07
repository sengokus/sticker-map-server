export const isURL = (str: string): boolean => {
    const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return pattern.test(str);
};

export const lastNumberInString = (str: string): number => {
    const numberPart = str.match(/\d+$/)?.[0];
    return numberPart ? parseInt(numberPart) : 0;
};

export const removeAllSpaces = (str: string) => {
    return str.replace(/\s/g, "");
};

export const maskString = (str: string, length: number = 10) => {
    if (str.length <= length || length <= 3) {
        return str.substring(0, 1) + "*".repeat(length - 1);
    } else {
        const ellipsisLength = 3; // Length of "..."
        const remainingLength = length - ellipsisLength;
        const beginningLength = Math.ceil(remainingLength / 2);
        const endingLength = Math.floor(remainingLength / 2);

        const beginning = str.substring(0, beginningLength);
        const ending = str.substring(str.length - endingLength);

        return beginning + "..." + ending;
    }
};

export const processHiddenCharactersForHtml = (str: string) => {
    return str.replace(/\n/g, "<br>").replace(/\r/g, "&#13;").replace(/\t/g, "&#9;");
};

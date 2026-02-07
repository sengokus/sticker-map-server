const fs = require('fs');
const readline = require('readline');

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node camelCaseCheck.cjs <file_path>');
    process.exit(1);
}

const isCamelCase = (str) => {
    // Regular expression to match camelCase variables.
    // It looks for two consecutive words where the first one ends
    // and the second one starts with an uppercase letter.
    const regex = /[a-z][A-Z]/;
    return regex.test(str);
};

const checkCamelCaseVariables = (filePath) => {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });

    let lineNumber = 0;

    let allClear = true;
    lineReader.on('line', (line) => {
        lineNumber++;
        line = line.replace(/^\s+/, "");
        if (line.match(/^\s*[A-Z]/)) {
            console.error(`Error on line ${lineNumber}: Line starting with capital letter found: "${line.trim()}"`);
            allClear = false;
        }
        // Split the line by space and check each word for camelCase
        const words = line.split(/\s+/);
        if (words.length > 0 && isCamelCase(words[0])) {
            console.log(`Error on line ${lineNumber}: camelCase variable found - "${words[0]}"`);
            allClear = false;
        }
    });
};

checkCamelCaseVariables(filePath);
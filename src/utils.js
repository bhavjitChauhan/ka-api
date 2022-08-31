const VALID_KAID_LENGTHS = [20, 21, 22, 23, 24, 25];
const KaidRegex = /^kaid_\d{20,25}$/;

const VALID_PROGRAM_ID_LENGTHS = [9, 10, 16];
const ProgramIDRegex = /^((?:\d{9,10})|(?:\d{16}))$/;

/**
 * Checks if the input is a valid KAID
 *
 * @param {string} input
 * @returns {boolean}
 */
function isValidKaid(input) {
    const type = typeof input;
    if (type !== "string") throw new TypeError("Expected a string");
    if (!input.startsWith("kaid_"))
        throw new TypeError('Expected a string that starts with "kaid_"');
    input = input.slice(5);
    const length = input.length;
    if (!VALID_KAID_LENGTHS.includes(length))
        throw new TypeError("Expected a valid length");
    if (!/^\d+$/.test(input)) throw new RangeError("Expected an ID of digits");
    return true;
}

/**
 * Checks if the input is a valid program ID
 *
 * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L1
 *
 * @param {number|string} input
 * @returns {boolean}
 */
function isValidProgramID(input) {
    const type = typeof input;
    if (type != "string" && type != "number")
        throw new TypeError("Expected a string or number");
    if (type == "number") {
        if (input < 0) throw new RangeError("Expected a positive number");
        if (input > Number.MAX_SAFE_INTEGER)
            throw new RangeError(
                "Expected a number less than " + Number.MAX_SAFE_INTEGER
            );
        input = input.toString();
    }
    const length = input.length;
    if (length < 0) throw new RangeError("Expected a non-empty string");
    if (!VALID_PROGRAM_ID_LENGTHS.includes(length))
        throw new RangeError("Expected a valid length");
    if (!/^\d+$/.test(input))
        throw new RangeError("Expected a string of digits");
    return true;
}

/**
 * Extracts the program ID from a program URL
 *
 * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L16
 *
 * @param {string} url
 * @returns {string}
 */
function extractProgramID(url) {
    const regex =
        /khanacademy.org\/((cs)|(computer-programming))\/[\w-]+\/(\d+)/i;
    if (regex.test(url)) {
        const match = regex.exec(url);
        url = match[4];
    }
    try {
        isValidProgramID(url);
        return url;
    } catch {
        return null;
    }
}

module.exports = {
    VALID_KAID_LENGTHS,
    KaidRegex,
    VALID_PROGRAM_ID_LENGTHS,
    ProgramIDRegex,
    isValidKaid,
    isValidProgramID,
    extractProgramID,
};

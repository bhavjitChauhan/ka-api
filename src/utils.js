const { default: axios } = require("axios");
const getAuthenticatedHeader = require("./auth/getAuthenticatedHeader");

/**
 * Gets the latency of the Khan Academy API
 *
 * @param {Array|undefined} cookies
 * @returns {Promise<number|null>}
 */
async function getLatency(cookies) {
    const instance = axios.create();
    instance.interceptors.request.use(
        (config) => {
            const newConfig = { ...config };
            newConfig.metadata = { startTime: performance.now() };
            return newConfig;
        },
        (error) => Promise.reject(error)
    );
    instance.interceptors.response.use(
        (response) => {
            const newRes = { ...response };
            newRes.config.metadata.endTime = performance.now();
            newRes.duration =
                newRes.config.metadata.endTime -
                newRes.config.metadata.startTime;
            return newRes;
        },
        (error) => {
            const newError = { ...error };
            newError.config.metadata.endTime = performance.now();
            newError.duration =
                newError.config.metadata.endTime -
                newError.config.metadata.startTime;
            return Promise.reject(newError);
        }
    );

    let response;
    if (cookies)
        response = await instance.get(
            "https://www.khanacademy.org/_fastly/flags",
            getAuthenticatedHeader(cookies)
        );
    else
        response = await instance.get(
            "https://www.khanacademy.org/_fastly/flags"
        );

    return response.duration ?? null;
}

const VALID_KAID_LENGTHS = [20, 21, 22, 23, 24, 25];
const KaidRegex = /^kaid_\d{20,25}$/;

const VALID_PROGRAM_ID_LENGTHS = [9, 10, 16];
const ProgramIDRegex = /^[1-9](?:(?:\d{8,9})|(?:\d{15}))$/;

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
    if (!/^[1-9]\d+$/.test(input))
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
    getLatency,
    VALID_KAID_LENGTHS,
    KaidRegex,
    VALID_PROGRAM_ID_LENGTHS,
    ProgramIDRegex,
    isValidKaid,
    isValidProgramID,
    extractProgramID,
};

const { default: axios } = require("axios");
const getAuthenticatedHeader = require("./auth/getAuthenticatedHeader");

const VALID_KAID_LENGTHS = [20, 21, 22, 23, 24, 25];

const KaidRegex = /^kaid_\d{20,25}$/;

/**
 * Checks if the input is a valid KAID
 *
 * @param {string} input
 * @param {boolean} [error=true] Whether to throw an error
 * @returns {boolean}
 */
function isValidKaid(input, error = true) {
    if (!error) return KaidRegex.test(input);

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

const VALID_PROGRAM_ID_LENGTHS = [9, 10, 16];

/**
 * @link https://regexr.com/6t2vp
 */
const ProgramIDRegex = new RegExp(
    `^[1-9](?:(?:${VALID_PROGRAM_ID_LENGTHS.map((v) => `\\d{${v - 1}}`).join(
        "|"
    )}))$`
);

/**
 * Checks if the input is a valid program ID
 *
 * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L1
 *
 * @param {number|string} input
 * @param {boolean} [error=true] Whether to throw an error
 * @returns {boolean}
 */
function isValidProgramID(input, error = true) {
    if (!error) return ProgramIDRegex.test(input);
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

const PROGRAM_URL_TLDS = ["org", "com"];
const PROGRAM_URL_LOCALES = [
    "as",
    "az",
    "cs",
    "da",
    "el",
    "gu",
    "hu",
    "id",
    "it",
    "lt",
    "ja",
    "kk",
    "kn",
    "ky",
    "lv",
    "mn",
    "mr",
    "my",
    "nl",
    "pt-pt",
    "ru",
    "sv",
    "ta",
    "uz",
    "bg",
    "bn",
    "de",
    "en",
    "es",
    "fr",
    "hi",
    "hy",
    "ka",
    "km",
    "ko",
    "nb",
    "pa",
    "pl",
    "pt",
    "ro",
    "sr",
    "tr",
    "vi",
    "zh-hans",
];
const PROGRAM_URL_PATHS = [
    "computer-programming",
    "cs",
    "pixar",
    "nasa",
    "piab-sandbox",
    "computer-science",
    "hour-of-code",
    "math",
    "differential-equations",
    "electrical-engineering",
    "mcat",
    "apchem-topic",
    "chemistry",
    "art-history-basics",
    "biology",
];

/**
 * @link https://regexr.com/6uo1g
 */
const ProgramURLRegex = new RegExp(
    `^https?:\\/\\/(?:(?:www|${PROGRAM_URL_LOCALES.join(
        "|"
    )})\\.)?khanacademy\\.(?:${PROGRAM_URL_TLDS.join(
        "|"
    )})\\/(?:${PROGRAM_URL_PATHS.join(
        "|"
    )})\\/[a-zA-Z0-9-._~()'!*:@,;]+\\/${ProgramIDRegex.toString().slice(
        2,
        -2
    )}$`,
    "i"
);

/**
 * Checks if the input is a valid program URL
 *
 * @param {string} input
 * @returns
 */
function isValidProgramURL(input) {
    if (typeof input !== "string") return false;
    return ProgramURLRegex.test(input);
}

/**
 * Extracts the program ID from a program URL
 *
 * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L16
 *
 * @param {string} url
 * @returns {number}
 */
function extractProgramID(url) {
    if (!ProgramURLRegex.test(url)) return null;
    const parts = url.split("/");
    const ID = parts[parts.length - 1];
    if (!isValidProgramID(ID, false)) return null;
    return parseInt(ID, 10);
}

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

module.exports = {
    VALID_KAID_LENGTHS,
    KaidRegex,
    isValidKaid,
    VALID_PROGRAM_ID_LENGTHS,
    ProgramIDRegex,
    isValidProgramID,
    PROGRAM_URL_TLDS,
    PROGRAM_URL_LOCALES,
    PROGRAM_URL_PATHS,
    ProgramURLRegex,
    isValidProgramURL,
    extractProgramID,
    getLatency,
};

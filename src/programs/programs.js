const axios = require("axios");

const PROGRAM_DEFAULT_JSON = require("./defaultProgramJson.js");

const {
    makeAuthenticatedPostRequest,
    makeAuthenticatedPutRequest,
    makeAuthenticatedDeleteRequest,
} = require("../request/authenticatedRequest.js");
const getQueryTime = require("./getQueryTime.js");

const checkString = require("../moderation/check-string.js");

const deepmerge = require("deepmerge");

const config = require("../config.js");

const VALID_PROGRAM_TYPES = ["pjs", "webpage", "sql"];

/**
 * Returns the program info, given the program's ID
 *
 * @param {string} id The program's ID
 */
async function getProgramJSON(id) {
    const url = `https://www.khanacademy.org/api/internal/scratchpads/${id}`;

    return axios.get(url).then((response) => response.data);
}

/**
 * Create a new program on KA's servers
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} code - The code of the new program
 * @param {object} [settings] - Any custom settings to override
 * @param {("pjs","webpage","sql")} [type] - The type of program
 */
async function newProgram(cookies, code, settings = {}, type = "pjs") {
    if (!VALID_PROGRAM_TYPES.includes(type)) {
        throw `Program type needs to be of type ${VALID_PROGRAM_TYPES}`;
    }

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    let jsonToSend = deepmerge(
        {
            title: "New program",
            translatedTitle: "New program",
            category: null,
            difficulty: null,
            tags: [],
            userAuthoredContentType: type,
            topicId: "xffde7c31",
            revision: {
                code: code || "",
                editor_type: "ace_" + type,
                folds: [],
                image_url: PROGRAM_DEFAULT_JSON.revision.image_url,
                config_version: 4,
                topic_slug: "computer-programming",
            },
        },
        settings
    );

    let url = `https://www.khanacademy.org/api/internal/scratchpads?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, jsonToSend);
}

/**
 * Creates a spin-off of another program
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} originalProgram - The original program's ID
 * @param {string} code - The code in the spinoff
 * @param {object} [settings] Settings to override the JSON request
 * @param {object} [originalProgramJSON] The program json if already retrieved (to reduce unneccessary requests)
 */
async function spinOffProgram(
    cookies,
    originalProgram,
    code,
    settings = {},
    originalProgramJSON
) {
    originalProgramJSON =
        originalProgramJSON || (await getProgramJSON(originalProgram));

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    let jsonToSend = deepmerge(
        {
            title: "New program",
            originRevisionId: originalProgramJSON.revision.id,
            originScratchpadId: originalProgram,
            originScratchpadKind: "Scratchpad",
            revision: {
                code: code || "",
                editor_type: "ace_pjs",
                editorType: "ace_pjs",
                folds: [],
                image_url: PROGRAM_DEFAULT_JSON.revision.image_url,
                mp3Url: "",
                translatedMp3Url: null,
                youtubeId: null,
                playback: "",
                tests: "",
                config_version: 4,
                configVersion: 4,
                topic_slug: "computer-programming",
            },
        },
        settings
    );

    let url = `https://www.khanacademy.org/api/internal/scratchpads?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, jsonToSend);
}

/**
 * Updates an existing program based on the parameters
 *
 * @param {Array} cookies An array of set-cookie response headers from axios
 * @param {string} programId The program's ID being updated
 * @param {string} code The code
 * @param {object} [settings] Settings to override the JSON request
 * @param {object} [programJson] The program json if already retrieved (to reduce unneccessary requests)
 */
async function updateProgram(
    cookies,
    programId,
    code,
    settings = {},
    programJson
) {
    programJson = programJson || (await getProgramJSON(programId)); //get the program's JSON, is this necessary?

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    var jsonToSend = deepmerge(
        {
            ...PROGRAM_DEFAULT_JSON,
            ...programJson,
            relativeUrl: "/computer-programming/_/" + programId,
            id: parseInt(programId),
            date: new Date().toISOString().substring(0, 19) + "Z",
            revision: {
                ...PROGRAM_DEFAULT_JSON.revision,
                ...programJson.revision,
                code: code,
            },
            trustedRevision: {
                created: new Date().toISOString(),
            },
        },
        settings
    );

    const url = `https://www.khanacademy.org/api/internal/scratchpads/${programId}?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPutRequest(cookies, url, jsonToSend);
}

/**
 * Deletes a program
 *
 * @param {Array} cookies - An array of set-cookie response headers from axios
 * @param {string} programId - The program ID
 */
async function deleteProgram(cookies, programId) {
    const url = `https://www.khanacademy.org/api/internal/scratchpads/${programId}?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedDeleteRequest(cookies, url);
}

module.exports = {
    getProgramJSON,
    newProgram,
    spinOffProgram,
    updateProgram,
    deleteProgram,
};

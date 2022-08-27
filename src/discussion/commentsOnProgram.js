/**
 * Note: comments on programs are different than comments on comments
 */

const axios = require("axios");

const {
    makeAuthenticatedPostRequest,
    makeAuthenticatedDeleteRequest,
} = require("../request/authenticatedRequest.js");

/**
 * Returns all the comments of type `commentType` on the program
 *
 * @param {string} programId
 * @param {("comments","questions")} commentType - Whether to get comments or questions
 *
 * @returns {object} All the comments on a program
 */
async function getProgramComments(programId, commentType = "comments") {
    const url = `https://www.khanacademy.org/api/internal/discussions/scratchpad/${programId}/${commentType}?casing=camel&limit=1000000&page=0&sort=1&lang=en`;

    return axios.get(url).then((response) => {
        return response.data;
    });
}

/**
 * Returns the details of a comment on a program
 *
 * @param {string} programId - The ID of the program
 * @param {string} commentExpandKey - The comment expand key (found in the response of @see getProgramComments)
 * @param {("comments","questions")} commentType - Whether getting a comment or a question
 *
 * @returns {object} The comment
 */
async function getProgramCommentDetails(
    programId,
    commentExpandKey,
    commentType = "comments"
) {
    const url = `https://www.khanacademy.org/api/internal/discussions/scratchpad/${programId}/${commentType}?casing=camel&qa_expand_key=${commentExpandKey}&lang=en`;

    return axios.get(url).then((response) => {
        return response.data;
    });
}

/**
 * Adds a comment on the program
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} programId - The ID of the program
 * @param {string} text - The content of the comment
 * @param {("comments","questions")} commentType - Whether adding a comment or a question
 *
 * @returns {object} The comment
 */
async function commentOnProgram(
    cookies,
    programId,
    text,
    commentType = "comments"
) {
    const commentJSON = {
        fromVideoAuthor: false,
        shownLowQualityNotice: false,
        text: text,
        topic_slug: "computer-programming",
    };

    const url = `https://www.khanacademy.org/api/internal/discussions/scratchpad/${programId}/${commentType}?casing=camel&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, commentJSON);
}

/**
 * Deletes a comment on a program
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} commentKaencrypted - The kaencrypted id of the comment
 */
async function deleteProgramComment(cookies, commentKaencrypted) {
    const url = `https://www.khanacademy.org/api/internal/feedback/${commentKaencrypted}?lang=en`;

    return makeAuthenticatedDeleteRequest(cookies, url);
}

module.exports = {
    getProgramComments,
    getProgramCommentDetails,
    commentOnProgram,
    deleteProgramComment,
};

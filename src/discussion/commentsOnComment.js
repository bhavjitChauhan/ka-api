const axios = require("axios");

const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

/**
 * Returns a list of all the sub comments on a comment
 *
 * @param {string} commentExpandKey - The expand key of the comment
 *
 * @returns Promise<object> The api response for all the sub comments
 */
async function getCommentsOnComment(commentExpandKey) {
    const url = `https://www.khanacademy.org/api/internal/discussions/${commentExpandKey}/replies?casing=camel&lang=en`;

    return axios.get(url).then((response) => response.data);
}

/**
 * Post a comment on someone else's comment
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} commentExpandKey - The comments' expandKey property
 * @param {string} text The text to post
 */
async function commentOnComment(cookies, commentExpandKey, text) {
    const commentJSON = {
        text: text,
        topic_slug: "computer-programming",
    };

    const url = `https://www.khanacademy.org/api/internal/discussions/${commentExpandKey}/replies?casing=camel&lang=en`;

    makeAuthenticatedPostRequest(cookies, url, commentJSON);
}

module.exports = {
    getCommentsOnComment,
    commentOnComment,
};

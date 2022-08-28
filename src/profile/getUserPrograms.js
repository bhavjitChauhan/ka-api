const axios = require("axios");
const SORTING_TYPE = require("../programs/sortingType.js");

const {
    makeAuthenticatedGetRequest,
} = require("../request/authenticatedRequest.js");

/**
 *
 * @param {string} user The user's KAID or username
 * @param {SORTING_TYPE} [sortingType=1] The sorting type (default is most votes)
 * @param {number} [limit=1e4] The maximum number of programs to retrieve
 *
 * @returns {Promise<GetUserPrograms>} The JSON
 */
async function getUserPrograms(user, sortingType, limit = 1e4) {
    let sortType = 1; // default is most votes

    if (sortingType === SORTING_TYPE.MOST_VOTES) {
        sortType = 1;
    } else if (sortingType === SORTING_TYPE.NEWEST) {
        sortType = 2;
    }

    let url = `https://www.khanacademy.org/api/internal/user/scratchpads?sort=${sortType}&limit=${limit}`;
    url += user.startsWith("kaid_") ? `&kaid=${user}` : `&username=${user}`;

    return axios.get(url).then((response) => response.data);
}

/**
 * Get programs as a logged in user (useful for detecting shadowbanning)
 *
 * @param {object} cookies The cookies
 * @param {string} kaid The user's KAID
 * @param {SORTING_TYPE} sortingType The sorting type
 * @param {number} limit The maximum number of programs to retrieve
 * @returns {Promise<object>} The JSON
 */
async function getUserProgramsAuthenticated(cookies, kaid, sortingType, limit) {
    let sortType = 1; // default is most votes
    limit = limit || 10000;

    if (sortingType === SORTING_TYPE.MOST_VOTES) {
        sortType = 1;
    } else if (sortingType === SORTING_TYPE.NEWEST) {
        sortType = 2;
    }

    const url = `https://www.khanacademy.org/api/internal/user/scratchpads?casing=camel&kaid=${kaid}&sort=${sortType}&page=0&limit=${limit}`;

    return makeAuthenticatedGetRequest(cookies, url).then(
        (response) => response.data
    );
}

module.exports = {
    getUserPrograms,
    getUserProgramsAuthenticated,
};

/**
 * @typedef {Object} GetUserPrograms
 * @property {string} cursor
 * @property {Array<GetUserProgramsScratchpad>} scratchpads
 * @property {boolean} complete
 */

/**
 * @typedef {Object} GetUserProgramsScratchpad
 * @property {string} thumb
 * @property {string} created
 * @property {string} authorKaid
 * @property {string} title
 * @property {number} sumVotesIncremented
 * @property {boolean} flaggedByUser
 * @property {string} url
 * @property {string} key
 * @property {string} authorNickname
 * @property {number} spinoffCount
 * @property {string} translatedTitle
 */

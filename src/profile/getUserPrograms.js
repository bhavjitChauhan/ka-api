const axios = require("axios");
const SORTING_TYPE = require("../programs/sortingType.js");

const {
    makeAuthenticatedGetRequest,
} = require("../request/authenticatedRequest.js");

/**
 *
 * @param {string} kaid The user's KAID
 * @param {SORTING_TYPE} sortingType The sorting type
 * @param {number} limit The maximum number of programs to retrieve
 * @returns {Promise<object>} The JSON
 */
async function getUserPrograms(kaid, sortingType, limit) {
    let sortType = 1; // default is most votes
    limit = limit || 10000;

    if (sortingType === SORTING_TYPE.MOST_VOTES) {
        sortType = 1;
    } else if (sortingType === SORTING_TYPE.NEWEST) {
        sortType = 2;
    }

    const url = `https://www.khanacademy.org/api/internal/user/scratchpads?casing=camel&kaid=${kaid}&sort=${sortType}&page=0&limit=${limit}`;

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

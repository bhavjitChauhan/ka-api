const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const GET_FULL_USER_PROFILE_QUERY = require("../queries/getFullUserProfileQuery.js");

/**
 * Get a user's profile information given their username or kaid
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} user - The requested user's username or kaid
 *
 * @returns {Promise<GetFullUserProfile>} - The user's profile information
 */
async function getProfileInfo(cookies, user) {
    let variables;
    if (user.startsWith("kaid_")) variables = { kaid: user };
    else variables = { username: user };
    let body = {
        operationName: "getFullUserProfile",
        variables,
        query: GET_FULL_USER_PROFILE_QUERY,
    };

    let url =
        "https://www.khanacademy.org/api/internal/graphql/getFullUserProfile?lang=en";

    return makeAuthenticatedPostRequest(cookies, url, body).then(
        (result) => result.data
    );
}

module.exports = getProfileInfo;

/**
 * @typedef {Object} GetFullUserProfile
 * @property {Object} data
 * @property {Object} data.user
 * @property {string} data.user.__typename
 * @property {string} data.user.bio
 * @property {boolean} data.user.canAccessDistrictsHomepage
 * @property {number} data.user.countVideosCompleted
 * @property {string} data.user.id
 * @property {boolean} data.user.includesDistrictOwnedData
 * @property {boolean} data.user.isCoachingLoggedInUser
 * @property {boolean} data.user.isMidsignupPhantom
 * @property {boolean} data.user.isPhantom
 * @property {boolean} data.user.isSelf
 * @property {string} data.user.kaid
 * @property {string} data.user.nickname
 * @property {number} data.user.points
 * @property {Object} data.user.profile
 * @property {"Profile"} data.user.profile.__typename
 * @property {string} data.user.profile.accessLevel
 * @property {string} data.user.profileRoot
 * @property {string|null} data.user.username
 */

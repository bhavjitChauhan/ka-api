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
 * @property {boolean} data.actorIsImpersonatingUser
 * @property {GetFullUserProfileUser|null} data.user
 */

/**
 * @typedef {Object} GetFullUserProfileUser
 * @property {"User"} user.__typename
 * @property {string} user.bio
 * @property {boolean} user.canAccessDistrictsHomepage
 * @property {number} user.countVideosCompleted
 * @property {string} user.id
 * @property {boolean} user.includesDistrictOwnedData
 * @property {boolean} user.isCoachingLoggedInUser
 * @property {boolean} user.isMidsignupPhantom
 * @property {boolean} user.isPhantom
 * @property {boolean} user.isSelf
 * @property {string} user.kaid
 * @property {string} user.nickname
 * @property {0} user.points
 * @property {Object} user.profile
 * @property {"Profile"} user.profile.__typename
 * @property {string} user.profile.accessLevel
 * @property {string} user.profileRoot
 * @property {string|null} user.username
 */

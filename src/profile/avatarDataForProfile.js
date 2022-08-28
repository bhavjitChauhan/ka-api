const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const AVATAR_DATA_FOR_PROFILE_QUERY = require("../queries/avatarDataForProfile.js");

/**
 * Get a user's avatar information given their username or kaid
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} user - The requested user's username or kaid
 *
 * @returns {Promise<AvatarDataForProfile>} - The user's avatar information
 */
async function avatarDataForProfile(cookies, user) {
    let variables;
    if (user.startsWith("kaid_")) variables = { kaid: user };
    else variables = { username: user };
    let body = {
        operationName: "avatarDataForProfile",
        variables,
        query: AVATAR_DATA_FOR_PROFILE_QUERY,
    };

    let url =
        "https://www.khanacademy.org/api/internal/graphql/avatarDataForProfile?lang=en";

    return makeAuthenticatedPostRequest(cookies, url, body).then(
        (result) => result.data
    );
}

module.exports = avatarDataForProfile;

/**
 * @typedef {Object} AvatarDataForProfile
 * @property {Object} user
 * @property {"User"} user.__typename
 * @property {Object} user.avatar
 * @property {"Avatar"} user.avatar.__typename
 * @property {string} user.avatar.imageSrc
 * @property {string} user.avatar.name
 * @property {string} user.id
 * @property {string} user.kaid
 */

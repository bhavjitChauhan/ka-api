const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const AVATAR_DATA_FOR_PROFILE_QUERY = require("../queries/avatarDataForProfile.js");

/**
 * Get a user's avatar information given their kaid
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} kaid - The requested user's kaid
 *
 * @returns {Promise<AvatarDataForProfile>} - The user's avatar information
 */
async function avatarDataForProfile(cookies, kaid) {
    let body = {
        operationName: "avatarDataForProfile",
        variables: { kaid },
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
 * @property {Object} data
 * @property {AvatarDataForProfileUser|null} data.user
 */

/**
 * @typedef {Object} AvatarDataForProfileUser
 * @property {"User"} data.user.__typename
 * @property {Object} data.user.avatar
 * @property {"Avatar"} data.user.avatar.__typename
 * @property {string} data.user.avatar.imageSrc
 * @property {string} data.user.avatar.name
 * @property {string} data.user.id
 * @property {string} data.user.kaid *
 */

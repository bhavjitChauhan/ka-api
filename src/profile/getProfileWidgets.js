const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const GET_PROFILE_WIDGETS_QUERY = require("../queries/getProfileWidgets.js");
const { default: axios } = require("axios");

/**
 * Get a user's profile information given their KAID
 *
 * @param {Array<string>|null} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} kaid - The requested user's KAID
 *
 * @returns {Promise<GetProfileWidgets>} - The user's profile information
 */
async function getProfileWidgets(cookies, kaid) {
    let body = {
        operationName: "getProfileWidgets",
        variables: { kaid },
        query: GET_PROFILE_WIDGETS_QUERY,
    };

    let url =
        "https://www.khanacademy.org/api/internal/graphql/getProfileWidgets?lang=en";

    if (cookies) {
        return makeAuthenticatedPostRequest(cookies, url, body).then(
            (result) => result.data
        );
    } else {
        return axios.post(url, body).then((result) => result.data);
    }
}

module.exports = getProfileWidgets;

/**
 * @typedef {Object} GetProfileWidgets
 * @property {GetProfileWidgetsData|undefined} data
 * @property {getProfileWidgetsErrors|undefined} errors
 */

/**
 * @typedef {Object} GetProfileWidgetsData
 * @property {GetProfileWidgetsUser|null} data.user
 * @property {GetProfileWidgetsUserSummary|null} data.userSummary
 */

/**
 * @typedef {Object} GetProfileWidgetsUser
 * @property {"User"} __typename
 * @property {string|null} badgeCounts
 * @property {string} id
 * @property {unknown|null} isChild
 * @property {string} kaid
 * @property {object} profile
 * @property {"Profile"} profile.__typename
 * @property {Array<GetFullUserProfileProgram} profile.programs
 * @property {Array<GetFullUserProfileProgramDeprecated>} programsDeprecated
 */

/**
 * @typedef {Object} GetProfileWidgetsUserSummary
 * @property {"UserSummary"} __typename
 * @property {object} statistics
 * @property {"UserStatistics"} statistics.__typename
 * @property {number} statistics.answers
 * @property {number} statistics.comments
 * @property {0} statistics.flags
 * @property {number} statistics.projectanswers
 * @property {number} statistics.projectquestions
 * @property {number} statistics.questions
 * @property {number} statistics.replies
 * @property {number} statistics.votes
 */

/**
 * @typedef {Object} GetFullUserProfileProgram
 * @property {"Program"} __typename
 * @property {string|null} authorKaid
 * @property {string|null} authorNickname
 * @property {unknown|null} deleted
 * @property {number} displayableSpinoffCount
 * @property {string} imagePath
 * @property {string} key
 * @property {number} sumVotesIncremented
 * @property {string} translatedTitle
 * @property {string} url
 */

/**
 * @typedef {Object} GetFullUserProfileProgramDeprecated
 * @property {"Program"} __typename
 * @property {string|null} authorKaid
 * @property {string|null} authorNickname
 * @property {number} displayableSpinoffCount
 * @property {string} imagePath
 * @property {string} key
 * @property {number} sumVotesIncremented
 * @property {string} translatedTitle
 * @property {string} url
 */

/**
 * @typedef {Array<getProfileWidgetsErrorsMessage>} getProfileWidgetsErrors
 */

/**
 * @typedef {Object} getProfileWidgetsErrorsMessage
 * @property {string} message
 * @property {string|undefined} extensions
 */

/**
 * @typedef {Object} getProfileWidgetsErrorsMessageExtensions
 * @property {string} code
 * @property {string} serviceName
 */

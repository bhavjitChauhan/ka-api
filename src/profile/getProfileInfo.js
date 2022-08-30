const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const GET_FULL_USER_PROFILE_QUERY = require("../queries/getFullUserProfileQuery.js");
const { default: axios } = require("axios");

/**
 * Get a user's profile information given their username or KAID
 *
 * @param {Array<string>|null} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} user - The requested user's username or KAID
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

    if (cookies) {
        return makeAuthenticatedPostRequest(cookies, url, body).then(
            (result) => result.data
        );
    } else {
        return axios.post(url, body).then((result) => result.data);
    }
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
 * @property {"User"} __typename
 * @property {string|null} authEmails
 * @property {boolean|null} autocontinueOn
 * @property {string|null} badgeCounts
 * @property {string} bio
 * @property {boolean} canAccessDistrictsHomepage
 * @property {boolean|null} canHellban
 * @property {boolean|null} canMessageUsers
 * @property {boolean|null} canModifyCoaches
 * @property {number} countVideosCompleted
 * @property {string|null} email
 * @property {string|null} gaUserId
 * @property {boolean|null} hasChildren
 * @property {boolean|null} hasClasses
 * @property {boolean|null} hasCoach
 * @property {boolean|null} hasStudents
 * @property {boolean|null} hideVisual
 * @property {string|null} homepageUrl
 * @property {string} id
 * @property {boolean} includesDistrictOwnedData
 * @property {boolean|null} isChild
 * @property {boolean} isCoachingLoggedInUser
 * @property {boolean|null} isCreator
 * @property {boolean|null} isCurator
 * @property {boolean|null} isDataCollectible
 * @property {boolean|null} isDeveloper
 * @property {boolean} isMidsignupPhantom
 * @property {boolean|null} isModerator
 * @property {boolean|null} isOrphan
 * @property {boolean|null} isParent
 * @property {boolean} isPhantom
 * @property {boolean|null} isPublisher
 * @property {boolean|null} isSatStudent
 * @property {boolean} isSelf
 * @property {boolean|null} isTeacher
 * @property {string|null} joined
 * @property {string} kaid
 * @property {string|null} key
 * @property {boolean|null} muteVideos
 * @property {number|null} newNotificationCount
 * @property {string} nickname
 * @property {boolean|null} noColorInVideos
 * @property {unknown[]|null} pendingEmailVerifications
 * @property {number} points
 * @property {unknown|null} preferredKaLocale
 * @property {boolean|null} prefersReducedMotion
 * @property {object} profile
 * @property {"Profile"} profile.__typename
 * @property {string} profile.accessLevel
 * @property {string} profileRoot
 * @property {string|null} qualarooId
 * @property {boolean|null} shouldShowAgeCheck
 * @property {boolean|null} showCaptions
 * @property {unknown|null} signupDataIfUnverified
 * @property {boolean|null} soundOn
 * @property {boolean|null} tosAccepted
 * @property {unknown|null} underAgeGate
 * @property {string|null} userId
 * @property {string|null} username
 */

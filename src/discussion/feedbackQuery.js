const { default: axios } = require("axios");

const {
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");

const FEEDBACK_QUERY = require("../queries/feedbackQuery");

/**
 *
 * @param {Array<string>|null} cookies
 * @param {number|string} id The ID of the program
 * @param {"QUESTION"|"COMMENT"|"PROJECT_HELP_QUESTION"} [type="COMMENT"] Whether to get comments or questions
 * @param {1|2} [sort=1] Sort by 1: Top Voted, 2: Most Recent
 * @param {number} [limit=10] The maximum number of comments to return
 * @param {string} [cursor] The cursor to start from
 * @returns {Promise<FeedbackQuery>}
 */
function feedbackQuery(cookies, id, type = "COMMENT", sort = 1, limit, cursor) {
    const url = `https://www.khanacademy.org/api/internal/graphql/feedbackQuery`;
    const variables = {
        topicId: id,
        focusKind: "scratchpad",
        feedbackType: type,
        currentSort: sort,
    };
    if (limit) variables.limit = limit;
    if (cursor) variables.cursor = cursor;
    const body = {
        operationName: "feedbackQuery",
        variables,
        query: FEEDBACK_QUERY,
    };

    if (cookies) {
        return makeAuthenticatedPostRequest(cookies, url, body).then(
            (result) => result.data
        );
    } else {
        return axios.post(url, body).then((result) => result.data);
    }
}

module.exports = feedbackQuery;

/**
 * @typedef {object} FeedbackQuery
 * @property {object} data
 * @property {FeedbackQueryFeedback|null} data.feedback
 * @property {FeedbackQueryError[]|undefined} data.errors
 */

/**
 * @typedef {object} FeedbackQueryFeedback
 * @property {"FeedbackForFocus"} data.feedback.__typename
 * @property {string} data.feedback.cursor
 * @property {FeedbackQueryFeedbackFeedback[]} data.feedback.feedback
 * @property {boolean} data.feedback.isComplete
 * @property {boolean} data.feedback.sortedByDate
 */

/**
 * @typedef {object} FeedbackQueryFeedbackFeedback
 * @property {"BasicFeedback"} __typename
 * @property {unknown|null} appearsAsDeleted
 * @property {FeedbackQueryFeedbackFeedbackAuthor|null} author
 * @property {unknown[]} badges
 * @property {string} content
 * @property {string} date
 * @property {boolean} definitelyNotSpam
 * @property {unknown|null} deleted
 * @property {boolean} downVoted
 * @property {string} expandKey
 * @property {string} feedbackType
 * @property {unknown[]} flaggedBy
 * @property {boolean} flaggedByUser
 * @property {unknown[]} flags
 * @property {object} focus
 * @property {"FeedbackFocus"} focus.__typename
 * @property {string} focus.id
 * @property {string} focus.kind
 * @property {string} focus.relativeUrl
 * @property {string|null} focus.translatedTitle
 * @property {string} focusUrl
 * @property {boolean} fromVideoAuthor
 * @property {string} key
 * @property {unknown|null} lowQualityScore
 * @property {boolean} notifyOnAnswer
 * @property {string} permalink
 * @property {string} qualityKind
 * @property {number} replyCount
 * @property {unknown|null} replyExpandKeys
 * @property {unknown|null} showLowQualityNotice
 * @property {number} sumVotesIncremented
 * @property {boolean} upVoted
 */

/**
 * @typedef {object} FeedbackQueryFeedbackFeedbackAuthor
 * @property {"User"} __typename
 * @property {object} avatar
 * @property {"Avatar"} avatar.__typename
 * @property {string} avatar.imageSrc
 * @property {string} avatar.name
 * @property {string} id
 * @property {string} kaid
 * @property {string} nickname
 */

/**
 * @typedef {object} FeedbackQueryError
 * @property {object} extensions
 * @property {string} extensions.code
 * @property {string} extensions.serviceName
 * @property {string} message
 */

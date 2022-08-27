const { getCommentsOnComment } = require("../discussion/commentsOnComment.js");

/**
 * Given a comment notification this will return that notification's comment details as well as the thread it's in
 *
 * @param {object} notificationJson - The raw json from the @see getNotificationsRequest result
 * @param {Array<object>} [prerequestedComments] - If the posts request was already made,
 * don't make it again by providing the existing request
 *
 * @returns {object} - A object containing the requested post and the thread it was in
 */
async function getNotificationCommentDetails(
    notificationJson,
    prerequestedComments
) {
    let { feedbackHierarchy } = notificationJson;

    let comments =
        prerequestedComments ||
        (await getCommentsOnComment(
            feedbackHierarchy[feedbackHierarchy.length - 1]
        ));

    return {
        post: comments.find(
            (comment) => comment.expandKey === notificationJson.feedback
        ),
        posts: comments,
    };
}

module.exports = {
    getNotificationCommentDetails,
};

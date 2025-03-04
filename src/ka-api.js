module.exports = {};

module.exports.auth = {
    ...require("./auth/login.js"),
    ...require("./auth/session.js"),
    getAuthenticatedHeader: require("./auth/getAuthenticatedHeader.js"),
};

module.exports.cookies = {
    ...require("./cookies/cookies.js"),
};

module.exports.discussion = {
    feedbackQuery: require("./discussion/feedbackQuery.js"),
    ...require("./discussion/commentsOnComment.js"),
    ...require("./discussion/commentsOnProgram.js"),
};

module.exports.notifications = {
    ...require("./notifications/commentNotifications.js"),
    ...require("./notifications/notifications.js"),
};

module.exports.profile = {
    getProfileInfo: require("./profile/getProfileInfo.js"),
    getProfileWidgets: require("./profile/getProfileWidgets.js"),
    avatarDataForProfile: require("./profile/avatarDataForProfile.js"),
    ...require("./profile/getUserPrograms.js"),
};

module.exports.programs = {
    ...require("./programs/programs.js"),
    ...require("./programs/getSpinoffs.js"),
};

module.exports.request = {
    ...require("./request/authenticatedRequest.js"),
};

module.exports.utils = {
    ...require("./utils.js"),
};

module.exports.config = require("./config.js");

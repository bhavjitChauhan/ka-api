const {
    makeAuthenticatedGetRequest,
    makeAuthenticatedPostRequest,
} = require("../request/authenticatedRequest.js");
/**
 * Get the most recent notifications from KA
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} [cursor] The cursor returned from previous getNotificationsRequest calls
 */
async function getNotificationsRequest(cookies, cursor) {
    let cursorString = cursor ? `&cursor=${cursor}` : "";

    let url = `https://www.khanacademy.org/api/internal/user/notifications/readable?casing=camel${cursorString}`;

    return makeAuthenticatedGetRequest(cookies, url).then(
        (response) => response.data
    );
}

/**
 * Will go through the notifications of the profile until checkFunction returns false
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {Function} checkFunction - A function that when returns false, it will stop the notification process
 * @param {number} [maxDepth=10] - The maximum depth in the notifications the code will request
 */
async function getNotificationsUntil(cookies, checkFunction, maxDepth = 10) {
    let currentCursor;
    let notifications = [];

    // prevent bad code from infinitely requesting
    let depth = 1;

    do {
        const response = await getNotificationsRequest(cookies, currentCursor);
        const nextCursor = response.cursor;

        const notifs = response.notifications;
        let notifsToKeep = [];

        for (let i = 0; i < notifs.length; i++) {
            if (checkFunction(notifs[i])) {
                notifsToKeep.push(notifs[i]);
            } else {
                break; // break as soon as anything doesn't meet the criteria
            }
        }

        // if anything was filtered out
        if (notifsToKeep.length !== notifs.length) {
            currentCursor = null;
        } else {
            currentCursor = nextCursor;
        }

        // only add notifications that meet the criteria
        notifications.push(...notifsToKeep);

        depth++;
    } while (currentCursor && depth < maxDepth);

    return notifications;
}

/**
 * Will go through the notifications of the profile until a notification isn't brand new
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {number} [maxDepth=10] - The maximum depth in the notifications the code will request
 */
async function getAllBrandNewNotifications(cookies, maxDepth = 10) {
    return await getNotificationsUntil(
        cookies,
        (notif) => notif.brandNew,
        maxDepth
    );
}

/**
 * Clears all brand new notifications so they aren't performed on twice
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 */
async function clearBrandNewNotifications(cookies) {
    const url =
        "https://www.khanacademy.org/api/internal/user/notifications/clear_brand_new?lang=en";

    return makeAuthenticatedPostRequest(cookies, url);
}

module.exports = {
    getNotificationsRequest,
    getNotificationsUntil,
    getAllBrandNewNotifications,
    clearBrandNewNotifications,
};

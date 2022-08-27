const {
    cookiesToCookieString,
    getCookieValue,
} = require("../cookies/cookies.js");

/**
 * Returns an axios header with all the proper authentication
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)} cookies
 * @param {object} customHeaders
 */
function getAuthenticatedHeader(cookies, customHeaders = {}) {
    return {
        headers: {
            Cookie: cookiesToCookieString(cookies),
            "x-ka-fkey": getCookieValue(cookies, "fkey"),
            ...customHeaders,
        },
    };
}

module.exports = getAuthenticatedHeader;

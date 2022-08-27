/**
 * Splits a cookie in the form of "cookie=value" into ["cookie", "value"]
 *
 * @param {string} cookie - a cookie in the form of "cookie=value"
 *
 * @returns {Array[string, string]} - cookie key and value
 */
function cookieToKeyValue(cookie) {
    var cookieKey = cookie.substring(0, cookie.indexOf("="));

    return [cookieKey, cookie.substring(cookieKey.length + 1)];
}

/**
 * Takes in an array of raw cookie headers, and puts them back together into a form sent in requests
 *
 * Example input: ['cookie1=value1; expires=Wed, 31 Dec 1969 16:00:00 GMT; path=/;',
 *     'cookie2=value2; expires=Wed, 31 Dec 1969 16:00:00 GMT; path=/;']
 * Example output: cookie1=value1; cookie2=value2
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @returns {string} - Cookie string sent to server
 */
function cookiesToCookieString(rawCookies) {
    return rawCookies
        .map((cookie) => {
            return cookie.substring(0, cookie.indexOf(";"));
        })
        .join("; ");
}

/**
 * Returns a cookie's value given a list of cookies in the form ["cookie1=value1", "cookie2=value2"]
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} cookieName
 *
 * @returns {string} - The cookie value requested
 */
function getCookieValue(cookies, cookieName) {
    var cookie = cookies.find((cookie) => {
        return cookie.indexOf(cookieName) === 0;
    });

    const cookieSpliced = cookie.substring(cookie.indexOf("=") + 1);

    return cookieSpliced.substring(0, cookieSpliced.indexOf("; "));
}

/**
 * Given a list of two cookie arrays, will override any old cookies with the new cookies,
 * and otherwise add them together
 *
 * @param {Array<string>} oldCookies - old cookies (overriden by any new cookies)
 * @param {Array<string>} newCookies - new cookies (to override old cookies)
 */
function mergeCookies(oldCookies, newCookies) {
    var cookies = {};

    oldCookies.map(cookieToKeyValue).forEach((cookie) => {
        cookies[cookie[0]] = cookie[1];
    });

    newCookies.map(cookieToKeyValue).forEach((cookie) => {
        cookies[cookie[0]] = cookie[1];
    });

    var cookiesArray = [];

    for (var i in cookies) {
        cookiesArray.push(i + "=" + cookies[i]);
    }

    return cookiesArray;
}

/**
 * Given a list of cookies, will generate the header necessary for an axios request with cookies
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 */
function genAxiosCookieHeader(cookies) {
    return {
        headers: {
            Cookie: cookiesToCookieString(cookies),
        },
    };
}

module.exports = {
    cookiesToCookieString,
    getCookieValue,
    cookieToKeyValue,
    mergeCookies,
    genAxiosCookieHeader,
};

const { default: axios } = require("axios");

const LOGIN_QUERY = require("../queries/loginQuery.js");

const { mergeCookies } = require("../cookies/cookies.js");
const { getSessionCookies } = require("./session.js");

const generateFKey = require("./generateFKey.js");
const getAuthenticatedHeader = require("./getAuthenticatedHeader.js");

/**
 * Logs into khan academy given a list of current session cookies
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} username
 * @param {string} password
 */
async function loginWithCookies(cookies, username, password) {
    return axios
        .post(
            "https://www.khanacademy.org/api/internal/graphql/loginWithPasswordMutation",
            {
                operationName: "loginWithPasswordMutation",
                variables: {
                    identifier: username,
                    password: password,
                },
                query: LOGIN_QUERY,
            },
            getAuthenticatedHeader(cookies)
        )
        .then((result) => {
            return result.headers["set-cookie"];
        });
}

/**
 * Logs into Khan Academy given a username and password, and returns the session cookies
 *
 * @param {string} username
 * @param {string} password
 *
 * @returns session cookies
 */
async function login(username, password) {
    if (username === undefined || password === undefined) {
        throw "Username and or password missing!";
    }

    let sessionCookies = await getSessionCookies();
    if (!sessionCookies) throw new Error("Failed to get session cookies");

    sessionCookies.push(
        `fkey=${generateFKey()}; expires=${new Date().toUTCString()}; samesite=Lax; path=/`
    );

    let loginCookies = await loginWithCookies(
        sessionCookies,
        username,
        password
    );
    if (!loginCookies)
        throw new Error(
            "Failed to get login cookies, check your username and password"
        );

    let cookies = mergeCookies(sessionCookies, loginCookies);

    return cookies;
}

module.exports = {
    login,
};

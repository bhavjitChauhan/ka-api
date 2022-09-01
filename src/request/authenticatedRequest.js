const { default: axios } = require("axios");

const getAuthenticatedHeader = require("../auth/getAuthenticatedHeader.js");

/**
 * Make a GET request with the proper authentication on Khan Academy
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} url The url on Khan Academy to make the GET request
 * @param {object} customHeaders Object of custom headers
 *
 * @returns {Promise} A promise that resolves to the response
 */
async function makeAuthenticatedGetRequest(cookies, url, customHeaders = {}) {
    return axios.get(url, getAuthenticatedHeader(cookies, customHeaders));
}

/**
 * Make a POST request with the proper authentication on Khan Academy
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} url The url on Khan Academy to make the POST request
 * @param {object} body The JSON body of the POST request
 * @param {object} customHeaders Object of custom headers
 *
 * @returns {Promise} A promise that resolves to the response
 */
async function makeAuthenticatedPostRequest(
    cookies,
    url,
    body,
    customHeaders = {}
) {
    return axios.post(
        url,
        body,
        getAuthenticatedHeader(cookies, customHeaders)
    );
}

/**
 * Make a PUT request with the proper authentication on Khan Academy
 *
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} url The url on Khan Academy to make the PUT request
 * @param {object} body The JSON body of the PUT request
 * @param {object} customHeaders Object of custom headers
 *
 * @returns {Promise} A promise that resolves to the response
 *
 */
async function makeAuthenticatedPutRequest(
    cookies,
    url,
    body,
    customHeaders = {}
) {
    return axios.put(url, body, getAuthenticatedHeader(cookies, customHeaders));
}

/**
 * Make a DELETE request with the proper authentication on Khan Academy
 *
 * @param {Object} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} url The resource to delete
 * @param {object} customHeaders Object of custom headers
 *
 * @returns {Promise} A promise that resolves to the response
 *
 */
async function makeAuthenticatedDeleteRequest(
    cookies,
    url,
    customHeaders = {}
) {
    return axios.delete(url, getAuthenticatedHeader(cookies, customHeaders));
}

module.exports = {
    makeAuthenticatedGetRequest,
    makeAuthenticatedPostRequest,
    makeAuthenticatedPutRequest,
    makeAuthenticatedDeleteRequest,
};

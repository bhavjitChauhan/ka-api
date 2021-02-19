const axios = require("axios");

const generateFKey = require("./generateFKey.js");

/**
 * Load khanacademy.org and return a list of all the cookies
 * 
 * @returns {Array} A list of cookies
**/
function getSessionCookies() {
    return axios.get("https://khanacademy.org/login").then((result) => {
        return result.headers["set-cookie"];
    }, {withCredentials: true});
}

module.exports = {
    getSessionCookies
};

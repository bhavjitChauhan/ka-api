const { profanity } = require("@2toad/profanity");

function checkString(str) {
    return profanity.exists(str);
}

module.exports = checkString;

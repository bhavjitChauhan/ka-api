/**
 * A helper function that returns the current time formatted for KA's servers
 */
function getQueryTime() {
    var now = new Date();

    var timeZone = now.toTimeString();
    timeZone = timeZone.substring(
        timeZone.indexOf("GMT") + 3,
        timeZone.indexOf("GMT") + 8
    );
    timeZone = timeZone.substring(0, 3) + ":" + timeZone.substring(3);

    //TODO: this needs to be cleaned up, and also stabilized
    return (
        new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .substring(0, 19) + timeZone
    );
}

module.exports = getQueryTime;

const axios = require("axios");

const SORTING_TYPE = require("./sortingType.js");

async function getSpinoffs(programId, sortingType, limit) {
    let sortType = 1; // default is most votes
    limit = limit || 10000;

    if (sortingType === SORTING_TYPE.MOST_VOTES) {
        sortType = 1;
    } else if (sortingType === SORTING_TYPE.NEWEST) {
        sortType = 2;
    }

    const url = `https://www.khanacademy.org/api/internal/scratchpads/Scratchpad:${programId}/top-forks?casing=camel&subject=all&sort=${sortType}&page=0&limit=${limit}`;

    return axios.get(url).then((response) => response.data);
}

module.exports = {
    getSpinoffs,
};

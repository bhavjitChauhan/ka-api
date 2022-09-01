const { default: axios } = require("axios");

const PROGRAM_DEFAULT_JSON = require("./defaultProgramJson.js");

const {
    makeAuthenticatedPostRequest,
    makeAuthenticatedPutRequest,
    makeAuthenticatedDeleteRequest,
} = require("../request/authenticatedRequest.js");
const getQueryTime = require("./getQueryTime.js");

const checkString = require("../moderation/check-string.js");

const deepmerge = require("deepmerge");

const config = require("../config.js");

const VALID_PROGRAM_TYPES = ["pjs", "webpage", "sql"];

/**
 * Returns the program info, given the program's ID
 *
 * @param {number|string} id The program's ID
 */
async function getProgramJSON(id) {
    const url = `https://www.khanacademy.org/api/internal/scratchpads/${id}`;

    return axios.get(url).then((response) => response.data);
}

/**
 * Returns the program and author info, given the program's ID
 *
 * @param {number|string} id The program's ID
 *
 * @return {Promise<ShowScratchpad|undefined>}
 */
async function showScratchpad(id) {
    const url = `https://www.khanacademy.org/api/internal/show_scratchpad?scratchpad_id=${id}`;

    return axios.get(url).then((response) => response.data);
}

/**
 * Create a new program on KA's servers
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} code - The code of the new program
 * @param {object} [settings] - Any custom settings to override
 * @param {("pjs","webpage","sql")} [type] - The type of program
 */
async function newProgram(cookies, code, settings = {}, type = "pjs") {
    if (!VALID_PROGRAM_TYPES.includes(type)) {
        throw `Program type needs to be of type ${VALID_PROGRAM_TYPES}`;
    }

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    let jsonToSend = deepmerge(
        {
            title: "New program",
            translatedTitle: "New program",
            category: null,
            difficulty: null,
            tags: [],
            userAuthoredContentType: type,
            topicId: "xffde7c31",
            revision: {
                code: code || "",
                editor_type: "ace_" + type,
                folds: [],
                image_url: PROGRAM_DEFAULT_JSON.revision.image_url,
                config_version: 4,
                topic_slug: "computer-programming",
            },
        },
        settings
    );

    let url = `https://www.khanacademy.org/api/internal/scratchpads?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, jsonToSend);
}

/**
 * Creates a spin-off of another program
 *
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {number|string} originalProgram - The original program's ID
 * @param {string} code - The code in the spinoff
 * @param {object} [settings] Settings to override the JSON request
 * @param {object} [originalProgramJSON] The program json if already retrieved (to reduce unnecessary requests)
 */
async function spinOffProgram(
    cookies,
    originalProgram,
    code,
    settings = {},
    originalProgramJSON
) {
    originalProgramJSON =
        originalProgramJSON || (await getProgramJSON(originalProgram));

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    let jsonToSend = deepmerge(
        {
            title: "New program",
            originRevisionId: originalProgramJSON.revision.id,
            originScratchpadId: originalProgram,
            originScratchpadKind: "Scratchpad",
            revision: {
                code: code || "",
                editor_type: "ace_pjs",
                editorType: "ace_pjs",
                folds: [],
                image_url: PROGRAM_DEFAULT_JSON.revision.image_url,
                mp3Url: "",
                translatedMp3Url: null,
                youtubeId: null,
                playback: "",
                tests: "",
                config_version: 4,
                configVersion: 4,
                topic_slug: "computer-programming",
            },
        },
        settings
    );

    let url = `https://www.khanacademy.org/api/internal/scratchpads?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, jsonToSend);
}

/**
 * Updates an existing program based on the parameters
 *
 * @param {Array<string>} cookies An array of set-cookie response headers from axios
 * @param {number|string} programId The program's ID being updated
 * @param {string} code The code
 * @param {object} [settings] Settings to override the JSON request
 * @param {object} [programJson] The program json if already retrieved (to reduce unnecessary requests)
 */
async function updateProgram(
    cookies,
    programId,
    code,
    settings = {},
    programJson
) {
    programJson = programJson || (await getProgramJSON(programId)); //get the program's JSON, is this necessary?

    if (config.filterBadwords && checkString(settings.title || "")) {
        throw "Cannot create a program with bad words in it.";
    }

    var jsonToSend = deepmerge(
        {
            ...PROGRAM_DEFAULT_JSON,
            ...programJson,
            relativeUrl: "/computer-programming/_/" + programId,
            id: parseInt(programId),
            date: new Date().toISOString().substring(0, 19) + "Z",
            revision: {
                ...PROGRAM_DEFAULT_JSON.revision,
                ...programJson.revision,
                code: code,
            },
            trustedRevision: {
                created: new Date().toISOString(),
            },
        },
        settings
    );

    const url = `https://www.khanacademy.org/api/internal/scratchpads/${programId}?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPutRequest(cookies, url, jsonToSend);
}

/**
 * Deletes a program
 *
 * @param {Array<string>} cookies - An array of set-cookie response headers from axios
 * @param {number|string} programId - The program ID
 */
async function deleteProgram(cookies, programId) {
    const url = `https://www.khanacademy.org/api/internal/scratchpads/${programId}?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedDeleteRequest(cookies, url);
}

module.exports = {
    getProgramJSON,
    showScratchpad,
    newProgram,
    spinOffProgram,
    updateProgram,
    deleteProgram,
};

/**
 * @typedef {object} ShowScratchpad
 * @property {object} scratchpad
 * @property {string} scratchpad.contentKindCode
 * @property {string} scratchpad.newUrlPath
 * @property {string} scratchpad.key
 * @property {string} scratchpad.relativeUrl
 * @property {number|null} scratchpad.originScratchpadId
 * @property {string} scratchpad.forkedFromTopic
 * @property {number} scratchpad.height
 * @property {string} scratchpad.date
 * @property {number} scratchpad.originSimilarity
 * @property {number} scratchpad.id
 * @property {string} scratchpad.editSlug
 * @property {unknown|null} scratchpad.category
 * @property {number|null} scratchpad.originRevisionId
 * @property {string|null} scratchpad.title
 * @property {unknown|null} scratchpad.translatedProjectEval
 * @property {boolean} scratchpad.sendToPeers
 * @property {string} scratchpad.nodeSlug
 * @property {boolean} scratchpad.isChallenge
 * @property {number} scratchpad.width
 * @property {unknown|null} scratchpad.youtubeId
 * @property {string} scratchpad.docsUrlPath
 * @property {string} scratchpad.contentKind
 * @property {string} scratchpad.type
 * @property {object} scratchpad.revision
 * @property {unknown|null} scratchpad.revision.tests
 * @property {string} scratchpad.revision.code
 * @property {string} scratchpad.revision.created
 * @property {[number,number][]} scratchpad.revision.folds
 * @property {unknown|null} scratchpad.revision.translatedMp3Url
 * @property {boolean} scratchpad.revision.hasAudio
 * @property {unknown|null} scratchpad.revision.mp3Url
 * @property {string} scratchpad.revision.editorType
 * @property {unknown|null} scratchpad.revision.playback
 * @property {unknown|null} scratchpad.revision.youtubeId
 * @property {number} scratchpad.revision.configVersion
 * @property {number} scratchpad.revision.id
 * @property {string} scratchpad.imagePath
 * @property {string} scratchpad.nodeType
 * @property {string} scratchpad.description
 * @property {boolean} scratchpad.isProject
 * @property {unknown[]} scratchpad.tags
 * @property {string} scratchpad.translatedDescription
 * @property {boolean} scratchpad.byChild
 * @property {unknown|null} scratchpad.difficulty
 * @property {boolean} scratchpad.originIsProject
 * @property {boolean} scratchpad.hideFromHotlist
 * @property {boolean} scratchpad.canvasOnly
 * @property {string} scratchpad.slug
 * @property {number} scratchpad.spinoffCount
 * @property {string} scratchpad.kind
 * @property {string} scratchpad.created
 * @property {string} scratchpad.url
 * @property {string} scratchpad.imageUrl
 * @property {boolean} scratchpad.isPublished
 * @property {number} scratchpad.sumVotesIncremented
 * @property {unknown|null} scratchpad.defaultUrlPath
 * @property {unknown[]} scratchpad.flags
 * @property {boolean} scratchpad.isProjectOrFork
 * @property {unknown|null} scratchpad.translatedProjectEvalTips
 * @property {string} scratchpad.userAuthoredContentType
 * @property {string} scratchpad.kaid
 * @property {string|null} scratchpad.translatedTitle
 * @property {boolean} embedded
 * @property {object} creatorProfile
 * @property {boolean} creatorProfile.isSelf
 * @property {number} creatorProfile.countVideosCompleted
 * @property {boolean} creatorProfile.isChildAccount
 * @property {boolean} creatorProfile.hasChangedAvatar
 * @property {boolean} creatorProfile.soundOn
 * @property {unknown|null} creatorProfile.affiliation
 * @property {boolean} creatorProfile.autocontinueOn
 * @property {string} creatorProfile.backgroundSrc
 * @property {boolean} creatorProfile.noColorInVideos
 * @property {boolean} creatorProfile.hideVisual
 * @property {unknown|null} creatorProfile.muteVideos
 * @property {boolean} creatorProfile.isDataCollectible
 * @property {string} creatorProfile.avatarName
 * @property {} creatorProfile.globalPermissions
 * @property {unknown|null} creatorProfile.affiliation_country_code
 * @property {string} creatorProfile.profileRoot
 * @property {string} creatorProfile.email
 * @property {string} creatorProfile.username
 * @property {string} creatorProfile.bio
 * @property {string} creatorProfile.backgroundName
 * @property {boolean} creatorProfile.isOrphan
 * @property {boolean} creatorProfile.isPublic
 * @property {object} creatorProfile.background
 * @property {string} creatorProfile.background.translatedDisplayName
 * @property {string} creatorProfile.background.imagePath
 * @property {string} creatorProfile.background.displayName
 * @property {string} creatorProfile.background.name
 * @property {string} creatorProfile.background.thumbSrc
 * @property {} creatorProfile.background.translatedRequirements
 * @property {string} creatorProfile.background.rewardType
 * @property {string} creatorProfile.background.thumbnailSrc
 * @property {string} creatorProfile.background.imageSrc
 * @property {string} creatorProfile.background.thumbnailPath
 * @property {string} creatorProfile.background.thumbPath
 * @property {boolean} creatorProfile.isPhantom
 * @property {boolean} creatorProfile.isMidsignupPhantom
 * @property {string} creatorProfile.nickname
 * @property {string} creatorProfile.kaid
 * @property {boolean} creatorProfile.prefersReducedMotion
 * @property {unknown|null} creatorProfile.dateJoined
 * @property {string} creatorProfile.avatarSrc
 * @property {unknown|null} creatorProfile.userLocation
 * @property {number} creatorProfile.points
 * @property {object} creatorProfile.avatar
 * @property {string} creatorProfile.avatar.translatedDisplayName
 * @property {string} creatorProfile.avatar.imagePath
 * @property {string} creatorProfile.avatar.displayName
 * @property {string} creatorProfile.avatar.name
 * @property {string} creatorProfile.avatar.partType
 * @property {string} creatorProfile.avatar.forModel
 * @property {} creatorProfile.avatar.translatedRequirements
 * @property {string} creatorProfile.avatar.rewardType
 * @property {string} creatorProfile.avatar.thumbnailSrc
 * @property {string} creatorProfile.avatar.imageSrc
 * @property {string} creatorProfile.avatar.thumbnailPath
 * @property {boolean} creatorProfile.includesUserDataInfo
 * @property {} creatorProfile.publicBadges
 * @property {object} discussion
 * @property {boolean} discussion.showProjectFeedback
 * @property {string} discussion.focusId
 * @property {boolean} discussion.isOwner
 * @property {boolean} discussion.restrictPosting
 * @property {string} discussion.focusKind
 * @property {boolean} discussion.canEdit
 * @property {boolean} upVoted
 * @property {ShowScratchpadOriginScratchpad|null} originScratchpad
 * @property {object} topic
 * @property {unknown|null} topic.curriculumKey
 * @property {string} topic.relativeUrl
 * @property {object[]} topic.userAuthoredContentTypesInfo
 * @property {string} topic.userAuthoredContentTypesInfo.new
 * @property {string} topic.userAuthoredContentTypesInfo.type
 * @property {string} topic.extendedSlug
 * @property {string} topic.currentRevisionKey
 * @property {string} topic.renderType
 * @property {string} topic.topicPageUrl
 * @property {string[]} topic.alternateSlugs
 * @property {boolean} topic.hasPeerReviewedProjects
 * @property {string} topic.id
 * @property {string} topic.domainSlug
 * @property {string} topic.backgroundImageCaption
 * @property {string[]} topic.userAuthoredContentTypes
 * @property {string} topic.creationDate
 * @property {boolean} topic.hide
 * @property {string} topic.title
 * @property {string} topic.webUrl
 * @property {string} topic.nodeSlug
 * @property {string} topic.deletedModTime
 * @property {unknown|null} topic.endorsement
 * @property {string} topic.iconSrc
 * @property {string} topic.contentKind
 * @property {string} topic.standaloneTitle
 * @property {string} topic.translatedStandaloneTitle
 * @property {string} topic.twitterUrl
 * @property {string} topic.brandingImageUrl
 * @property {string} topic.description
 * @property {} topic.tags
 * @property {boolean} topic.deleted
 * @property {boolean} topic.hasUserAuthoredContentTypes
 * @property {string} topic.translatedDescription
 * @property {boolean} topic.inKnowledgeMap
 * @property {string} topic.gplusUrl
 * @property {boolean} topic.doNotPublish
 * @property {string} topic.backgroundImageUrl
 * @property {object[]} topic.childData
 * @property {string} topic.childData.kind
 * @property {string} topic.childData.id
 * @property {string} topic.slug
 * @property {string} topic.kind
 * @property {string[]} topic.listedLocales
 * @property {string} topic.contentId
 * @property {string} topic.logoImageUrl
 * @property {string} topic.kaUrl
 * @property {string} topic.sha
 * @property {string} topic.facebookUrl
 * @property {object} topic.curation
 * @property {string[]} topic.curation.blacklist
 * @property {object[]} topic.curation.modules
 * @property {string} topic.curation.modules.kind
 * @property {object[]} topic.curation.modules.actions
 * @property {string} topic.curation.modules.actions.url
 * @property {string} topic.curation.modules.actions.text
 * @property {string} topic.curation.modules.actions.content_descriptor
 * @property {string} topic.curation.modules.title
 * @property {string} topic.curation.modules.call_to_action
 * @property {string} topic.curation.modules.link
 * @property {string} topic.curation.modules.description
 * @property {string} topic.translatedTitle
 * @property {boolean} flaggedByUser
 * @property {boolean} downVoted
 * @property {object} userScratchpad
 * @property {string} userScratchpad.kind
 * @property {number} userScratchpad.msWatched
 * @property {boolean} userScratchpad.isProject
 * @property {unknown|null} userScratchpad.msDuration
 * @property {number} userScratchpad.lastMsWatched
 * @property {number} userScratchpad.challengeStatus
 * @property {string} userScratchpad.scratchpadKey
 * @property {boolean} userScratchpad.fullyWatched
 * @property {boolean} userScratchpad.isComplete
 * @property {boolean} userScratchpad.isChallenge
 * @property {unknown|null} userScratchpad.difficulty
 * @property {number} userScratchpad.points
 * @property {string} userScratchpad.stashedCode
 * @property {string} userScratchpad.lastUpdated
 * @property {string} userScratchpad.key
 * @property {string} userScratchpad.userKey
 * @property {string} userScratchpad.id
 * @property {boolean} userScratchpad.viewed
 */

/**
 * @typedef {object} ShowScratchpadOriginScratchpad
 * @property {unknown|null} category
 * @property {string} imageUrl
 * @property {string} url
 * @property {unknown|null} translatedProjectEval
 * @property {boolean} sendToPeers
 * @property {string} translatedDescription
 * @property {string} slug
 * @property {boolean} deleted
 * @property {unknown|null} translatedProjectEvalTips
 * @property {object} revision
 * @property {number} revision.id
 * @property {number} id
 * @property {string|null} translatedTitle
 */

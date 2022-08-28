declare module "queries/loginQuery" {
    export = LOGIN_QUERY;
    const LOGIN_QUERY: "mutation loginWithPasswordMutation($identifier: String!, $password: String!) {\n  loginWithPassword(identifier: $identifier, password: $password) {\n    user {\n      id\n      kaid\n      canAccessDistrictsHomepage\n      isTeacher\n      hasUnresolvedInvitations\n      transferAuthToken\n      preferredKaLocale {\n        id\n        kaLocale\n        status\n        __typename\n      }\n      __typename\n    }\n    isFirstLogin\n    error {\n      code\n      __typename\n    }\n    __typename\n  }\n}\n";
}
declare module "cookies/cookies" {
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
    export function cookiesToCookieString(rawCookies: any): string;
    /**
     * Returns a cookie's value given a list of cookies in the form ["cookie1=value1", "cookie2=value2"]
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} cookieName
     *
     * @returns {string} - The cookie value requested
     */
    export function getCookieValue(cookies: Array<string>, cookieName: string): string;
    /**
     * Splits a cookie in the form of "cookie=value" into ["cookie", "value"]
     *
     * @param {string} cookie - a cookie in the form of "cookie=value"
     *
     * @returns {Array[string, string]} - cookie key and value
     */
    export function cookieToKeyValue(cookie: string): any;
    /**
     * Given a list of two cookie arrays, will override any old cookies with the new cookies,
     * and otherwise add them together
     *
     * @param {Array<string>} oldCookies - old cookies (overridden by any new cookies)
     * @param {Array<string>} newCookies - new cookies (to override old cookies)
     */
    export function mergeCookies(oldCookies: Array<string>, newCookies: Array<string>): string[];
    /**
     * Given a list of cookies, will generate the header necessary for an axios request with cookies
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     */
    export function genAxiosCookieHeader(cookies: Array<string>): {
        headers: {
            Cookie: string;
        };
    };
}
declare module "auth/session" {
    /**
     * Load khanacademy.org and return a list of all the cookies
     *
     * @returns {Array} A list of cookies
     **/
    export function getSessionCookies(): any[];
}
declare module "auth/generateFKey" {
    export = generateFKey;
    /**
     * Generates a FKey for a khan session
     *
     * @returns {string} FKey
     */
    function generateFKey(): string;
}
declare module "auth/getAuthenticatedHeader" {
    export = getAuthenticatedHeader;
    /**
     * Returns an axios header with all the proper authentication
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)} cookies
     * @param {object} customHeaders
     */
    function getAuthenticatedHeader(cookies: Array<string>, customHeaders?: object): {
        headers: any;
    };
}
declare module "auth/login" {
    /**
     * Logs into Khan Academy given a username and password, and returns the session cookies
     *
     * @param {string} username
     * @param {string} password
     *
     * @returns session cookies
     */
    export function login(username: string, password: string): Promise<string[]>;
}
declare module "request/authenticatedRequest" {
    /**
     * Make a GET request with the proper authentication on Khan Academy
     *
     * @param {Array} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} url The url on Khan Academy to make the GET request
     * @param {object} customHeaders Object of custom headers
     *
     * @returns {Promise} A promise that resolves to the response
     */
    export function makeAuthenticatedGetRequest(cookies: any[], url: string, customHeaders?: object): Promise<any>;
    /**
     * Make a POST request with the proper authentication on Khan Academy
     *
     * @param {Array} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} url The url on Khan Academy to make the POST request
     * @param {object} body The JSON body of the POST request
     * @param {object} customHeaders Object of custom headers
     *
     * @returns {Promise} A promise that resolves to the response
     */
    export function makeAuthenticatedPostRequest(cookies: any[], url: string, body: object, customHeaders?: object): Promise<any>;
    /**
     * Make a PUT request with the proper authentication on Khan Academy
     *
     * @param {Array} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} url The url on Khan Academy to make the PUT request
     * @param {object} body The JSON body of the PUT request
     * @param {object} customHeaders Object of custom headers
     *
     * @returns {Promise} A promise that resolves to the response
     *
     */
    export function makeAuthenticatedPutRequest(cookies: any[], url: string, body: object, customHeaders?: object): Promise<any>;
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
    export function makeAuthenticatedDeleteRequest(cookies: any, url: string, customHeaders?: object): Promise<any>;
}
declare module "discussion/commentsOnComment" {
    /**
     * Returns a list of all the sub comments on a comment
     *
     * @param {string} commentExpandKey - The expand key of the comment
     *
     * @returns Promise<object> The api response for all the sub comments
     */
    export function getCommentsOnComment(commentExpandKey: string): Promise<any>;
    /**
     * Post a comment on someone else's comment
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} commentExpandKey - The comments' expandKey property
     * @param {string} text The text to post
     */
    export function commentOnComment(cookies: Array<string>, commentExpandKey: string, text: string): Promise<void>;
}
declare module "discussion/commentsOnProgram" {
    /**
     * Returns all the comments of type `commentType` on the program
     *
     * @param {string} programId
     * @param {("comments","questions")} commentType - Whether to get comments or questions
     *
     * @returns {object} All the comments on a program
     */
    export function getProgramComments(programId: string, commentType?: string): object;
    /**
     * Returns the details of a comment on a program
     *
     * @param {string} programId - The ID of the program
     * @param {string} commentExpandKey - The comment expand key (found in the response of @see getProgramComments)
     * @param {("comments","questions")} commentType - Whether getting a comment or a question
     *
     * @returns {object} The comment
     */
    export function getProgramCommentDetails(programId: string, commentExpandKey: string, commentType?: string): object;
    /**
     * Adds a comment on the program
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} programId - The ID of the program
     * @param {string} text - The content of the comment
     * @param {("comments","questions")} commentType - Whether adding a comment or a question
     *
     * @returns {object} The comment
     */
    export function commentOnProgram(cookies: Array<string>, programId: string, text: string, commentType?: string): object;
    /**
     * Deletes a comment on a program
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} commentKaencrypted - The kaencrypted id of the comment
     */
    export function deleteProgramComment(cookies: Array<string>, commentKaencrypted: string): Promise<any>;
}
declare module "notifications/commentNotifications" {
    /**
     * Given a comment notification this will return that notification's comment details as well as the thread it's in
     *
     * @param {object} notificationJson - The raw json from the @see getNotificationsRequest result
     * @param {Array<object>} [prerequestedComments] - If the posts request was already made,
     * don't make it again by providing the existing request
     *
     * @returns {object} - A object containing the requested post and the thread it was in
     */
    export function getNotificationCommentDetails(notificationJson: object, prerequestedComments?: Array<object>): object;
}
declare module "notifications/notifications" {
    /**
     * Get the most recent notifications from KA
     *
     * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
     * @param {string} [cursor] The cursor returned from previous getNotificationsRequest calls
     */
    export function getNotificationsRequest(cookies: Array<string>, cursor?: string): Promise<any>;
    /**
     * Will go through the notifications of the profile until checkFunction returns false
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {Function} checkFunction - A function that when returns false, it will stop the notification process
     * @param {number} [maxDepth=10] - The maximum depth in the notifications the code will request
     */
    export function getNotificationsUntil(cookies: Array<string>, checkFunction: Function, maxDepth?: number): Promise<any[]>;
    /**
     * Will go through the notifications of the profile until a notification isn't brand new
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {number} [maxDepth=10] - The maximum depth in the notifications the code will request
     */
    export function getAllBrandNewNotifications(cookies: Array<string>, maxDepth?: number): Promise<any[]>;
    /**
     * Clears all brand new notifications so they aren't performed on twice
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     */
    export function clearBrandNewNotifications(cookies: Array<string>): Promise<any>;
}
declare module "queries/getFullUserProfileQuery" {
    export = GET_FULL_USER_PROFILE_QUERY;
    const GET_FULL_USER_PROFILE_QUERY: "query getFullUserProfile($kaid: String, $username: String) {\n  user(kaid: $kaid, username: $username) {\n    id\n    kaid\n    key\n    userId\n    email\n    username\n    profileRoot\n    gaUserId\n    qualarooId\n    isPhantom\n    isDeveloper: hasPermission(name: \"can_do_what_only_admins_can_do\")\n    isCurator: hasPermission(name: \"can_curate_tags\", scope: ANY_ON_CURRENT_LOCALE)\n    isCreator: hasPermission(name: \"has_creator_role\", scope: ANY_ON_CURRENT_LOCALE)\n    isPublisher: hasPermission(name: \"can_publish\", scope: ANY_ON_CURRENT_LOCALE)\n    isModerator: hasPermission(name: \"can_moderate_users\", scope: GLOBAL)\n    isParent\n    isSatStudent\n    isTeacher\n    isDataCollectible\n    isChild\n    isOrphan\n    isCoachingLoggedInUser\n    canModifyCoaches\n    nickname\n    hideVisual\n    joined\n    points\n    countVideosCompleted\n    bio\n    profile {\n      accessLevel\n      __typename\n    }\n    soundOn\n    muteVideos\n    showCaptions\n    prefersReducedMotion\n    noColorInVideos\n    autocontinueOn\n    newNotificationCount\n    canHellban: hasPermission(name: \"can_ban_users\", scope: GLOBAL)\n    canMessageUsers: hasPermission(name: \"can_send_moderator_messages\", scope: GLOBAL)\n    isSelf: isActor\n    hasStudents: hasCoachees\n    hasClasses\n    hasChildren\n    hasCoach\n    badgeCounts\n    homepageUrl\n    isMidsignupPhantom\n    includesDistrictOwnedData\n    canAccessDistrictsHomepage\n    preferredKaLocale {\n      id\n      kaLocale\n      status\n      __typename\n    }\n    underAgeGate {\n      parentEmail\n      daysUntilCutoff\n      approvalGivenAt\n      __typename\n    }\n    authEmails\n    signupDataIfUnverified {\n      email\n      emailBounced\n      __typename\n    }\n    pendingEmailVerifications {\n      email\n      __typename\n    }\n    tosAccepted\n    shouldShowAgeCheck\n    __typename\n  }\n  actorIsImpersonatingUser\n}\n";
}
declare module "profile/getProfileInfo" {
    export = getProfileInfo;
    /**
     * Get a user's profile information given their username or kaid
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} user - The requested user's username or kaid
     *
     * @returns {Promise<GetFullUserProfile>} - The user's profile information
     */
    function getProfileInfo(cookies: Array<string>, user: string): Promise<GetFullUserProfile>;
    namespace getProfileInfo {
        export { GetFullUserProfile };
    }
    type GetFullUserProfile = {
        data: {
            user: {
                __typename: string;
                bio: string;
                canAccessDistrictsHomepage: boolean;
                countVideosCompleted: number;
                id: string;
                includesDistrictOwnedData: boolean;
                isCoachingLoggedInUser: boolean;
                isMidsignupPhantom: boolean;
                isPhantom: boolean;
                isSelf: boolean;
                kaid: string;
                nickname: string;
                points: number;
                profile: {
                    __typename: "Profile";
                    accessLevel: string;
                };
                profileRoot: string;
                username: string;
            };
        };
    };
}
declare module "programs/sortingType" {
    export = SORTING_TYPE;
    const SORTING_TYPE: Readonly<{
        MOST_VOTES: "MOST_VOTES";
        NEWEST: "NEWEST";
    }>;
}
declare module "profile/getUserPrograms" {
    /**
     *
     * @param {string} kaid The user's KAID
     * @param {SORTING_TYPE} sortingType The sorting type
     * @param {number} limit The maximum number of programs to retrieve
     * @returns {Promise<object>} The JSON
     */
    export function getUserPrograms(kaid: string, sortingType: Readonly<{
        MOST_VOTES: "MOST_VOTES";
        NEWEST: "NEWEST";
    }>, limit: number): Promise<object>;
    /**
     * Get programs as a logged in user (useful for detecting shadowbanning)
     *
     * @param {object} cookies The cookies
     * @param {string} kaid The user's KAID
     * @param {SORTING_TYPE} sortingType The sorting type
     * @param {number} limit The maximum number of programs to retrieve
     * @returns {Promise<object>} The JSON
     */
    export function getUserProgramsAuthenticated(cookies: object, kaid: string, sortingType: Readonly<{
        MOST_VOTES: "MOST_VOTES";
        NEWEST: "NEWEST";
    }>, limit: number): Promise<object>;
}
declare module "queries/avatarDataForProfile" {
    export = AVATAR_DATA_FOR_PROFILE_QUERY;
    const AVATAR_DATA_FOR_PROFILE_QUERY: "query avatarDataForProfile($kaid: String!) {\n  user(kaid: $kaid) {\n    id\n    avatar {\n      name\n      imageSrc\n      __typename\n    }\n    __typename\n  }\n}\n";
}
declare module "profile/avatarDataForProfile" {
    export = avatarDataForProfile;
    /**
     * Get a user's avatar information given their username or kaid
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} user - The requested user's username or kaid
     *
     * @returns {Promise<AvatarDataForProfile>} - The user's avatar information
     */
    function avatarDataForProfile(cookies: Array<string>, user: string): Promise<AvatarDataForProfile>;
    namespace avatarDataForProfile {
        export { AvatarDataForProfile };
    }
    type AvatarDataForProfile = {
        user: {
            __typename: "User";
            avatar: {
                __typename: "Avatar";
                imageSrc: string;
                name: string;
            };
            id: string;
            kaid: string;
        };
    };
}
declare module "programs/defaultProgramJson" {
    export const contentKindCode: string;
    export const newUrlPath: string;
    export const hideFromHotlist: boolean;
    export const relativeUrl: string;
    export const originScratchpadId: any;
    export const forkedFromTopic: string;
    export const projectEval: any;
    export const height: number;
    export const canvasOnly: boolean;
    export const originSimilarity: number;
    export const id: number;
    export const definitelyNotSpam: boolean;
    export const editSlug: string;
    export const category: any;
    export const originRevisionId: any;
    export const title: string;
    export const translatedProjectEval: any;
    export const sendToPeers: boolean;
    export const slug: string;
    export const isChallenge: boolean;
    export const width: number;
    export const projectEvalTips: any;
    export const youtubeId: any;
    export const docsUrlPath: string;
    export const contentKind: string;
    export const type: string;
    export namespace revision {
        export const tests: any;
        export const code: string;
        export const folds: any[];
        export const translatedMp3Url: any;
        export const mp3Url: any;
        export const editorType: string;
        export const playback: any;
        const youtubeId_1: any;
        export { youtubeId_1 as youtubeId };
        export const configVersion: number;
        export const editor_type: string;
        export const image_url: string;
        export const config_version: number;
        export const topic_slug: string;
    }
    const tests_1: string;
    export { tests_1 as tests };
    export const imagePath: string;
    export const nodeType: string;
    export const description: string;
    export const isProject: boolean;
    export const tags: any[];
    export const translatedDescription: string;
    export const byChild: boolean;
    export const difficulty: any;
    export const originIsProject: boolean;
    export const key: string;
    export const date: string;
    export const nodeSlug: string;
    export const spinoffCount: number;
    export const kind: string;
    export namespace termMap {
        const _new: string;
        export { _new as new };
        export const restart: string;
    }
    export const created: string;
    export const url: string;
    export const imageUrl: string;
    export const isPublished: boolean;
    export const sumVotesIncremented: number;
    export const defaultUrlPath: any;
    export const flags: any[];
    export const isProjectOrFork: boolean;
    export const translatedProjectEvalTips: any;
    export const userAuthoredContentType: string;
    export const kaid: string;
    export const translatedTitle: string;
    export namespace trustedRevision {
        const created_1: string;
        export { created_1 as created };
    }
}
declare module "programs/getQueryTime" {
    export = getQueryTime;
    /**
     * A helper function that returns the current time formatted for KA's servers
     */
    function getQueryTime(): string;
}
declare module "moderation/check-string" {
    export = checkString;
    function checkString(str: any): boolean;
}
declare module "config" {
    export const filterBadwords: boolean;
}
declare module "programs/programs" {
    /**
     * Returns the program info, given the program's ID
     *
     * @param {string} id The program's ID
     */
    export function getProgramJSON(id: string): Promise<any>;
    /**
     * Create a new program on KA's servers
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} code - The code of the new program
     * @param {object} [settings] - Any custom settings to override
     * @param {("pjs","webpage","sql")} [type] - The type of program
     */
    export function newProgram(cookies: Array<string>, code: string, settings?: object, type?: string): Promise<any>;
    /**
     * Creates a spin-off of another program
     *
     * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} originalProgram - The original program's ID
     * @param {string} code - The code in the spinoff
     * @param {object} [settings] Settings to override the JSON request
     * @param {object} [originalProgramJSON] The program json if already retrieved (to reduce unnecessary requests)
     */
    export function spinOffProgram(cookies: Array<string>, originalProgram: string, code: string, settings?: object, originalProgramJSON?: object): Promise<any>;
    /**
     * Updates an existing program based on the parameters
     *
     * @param {Array} cookies An array of set-cookie response headers from axios
     * @param {string} programId The program's ID being updated
     * @param {string} code The code
     * @param {object} [settings] Settings to override the JSON request
     * @param {object} [programJson] The program json if already retrieved (to reduce unnecessary requests)
     */
    export function updateProgram(cookies: any[], programId: string, code: string, settings?: object, programJson?: object): Promise<any>;
    /**
     * Deletes a program
     *
     * @param {Array} cookies - An array of set-cookie response headers from axios
     * @param {string} programId - The program ID
     */
    export function deleteProgram(cookies: any[], programId: string): Promise<any>;
}
declare module "programs/getSpinoffs" {
    export function getSpinoffs(programId: any, sortingType: any, limit: any): Promise<any>;
}
declare module "ka-api" {
    export const auth: {
        getAuthenticatedHeader: typeof import("auth/getAuthenticatedHeader");
        getSessionCookies: typeof import("auth/session").getSessionCookies;
        login: typeof import("auth/login").login;
    };
    export const cookies: {
        cookiesToCookieString: typeof import("cookies/cookies").cookiesToCookieString;
        getCookieValue: typeof import("cookies/cookies").getCookieValue;
        cookieToKeyValue: typeof import("cookies/cookies").cookieToKeyValue;
        mergeCookies: typeof import("cookies/cookies").mergeCookies;
        genAxiosCookieHeader: typeof import("cookies/cookies").genAxiosCookieHeader;
    };
    export const discussion: {
        getProgramComments: typeof import("discussion/commentsOnProgram").getProgramComments;
        getProgramCommentDetails: typeof import("discussion/commentsOnProgram").getProgramCommentDetails;
        commentOnProgram: typeof import("discussion/commentsOnProgram").commentOnProgram;
        deleteProgramComment: typeof import("discussion/commentsOnProgram").deleteProgramComment;
        getCommentsOnComment: typeof import("discussion/commentsOnComment").getCommentsOnComment;
        commentOnComment: typeof import("discussion/commentsOnComment").commentOnComment;
    };
    export const notifications: {
        getNotificationsRequest: typeof import("notifications/notifications").getNotificationsRequest;
        getNotificationsUntil: typeof import("notifications/notifications").getNotificationsUntil;
        getAllBrandNewNotifications: typeof import("notifications/notifications").getAllBrandNewNotifications;
        clearBrandNewNotifications: typeof import("notifications/notifications").clearBrandNewNotifications;
        getNotificationCommentDetails: typeof import("notifications/commentNotifications").getNotificationCommentDetails;
    };
    export const profile: {
        getUserPrograms: typeof import("profile/getUserPrograms").getUserPrograms;
        getUserProgramsAuthenticated: typeof import("profile/getUserPrograms").getUserProgramsAuthenticated;
        getProfileInfo: typeof import("profile/getProfileInfo");
    };
    export const programs: {
        getSpinoffs: typeof import("programs/getSpinoffs").getSpinoffs;
        getProgramJSON: typeof import("programs/programs").getProgramJSON;
        newProgram: typeof import("programs/programs").newProgram;
        spinOffProgram: typeof import("programs/programs").spinOffProgram;
        updateProgram: typeof import("programs/programs").updateProgram;
        deleteProgram: typeof import("programs/programs").deleteProgram;
    };
    export const request: {
        makeAuthenticatedGetRequest: typeof import("request/authenticatedRequest").makeAuthenticatedGetRequest;
        makeAuthenticatedPostRequest: typeof import("request/authenticatedRequest").makeAuthenticatedPostRequest;
        makeAuthenticatedPutRequest: typeof import("request/authenticatedRequest").makeAuthenticatedPutRequest;
        makeAuthenticatedDeleteRequest: typeof import("request/authenticatedRequest").makeAuthenticatedDeleteRequest;
    };
    export const config: {
        filterBadwords: boolean;
    };
}

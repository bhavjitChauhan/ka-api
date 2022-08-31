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
     * Get a user's profile information given their username or KAID
     *
     * @param {Array<string>|null} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} user - The requested user's username or KAID
     *
     * @returns {Promise<GetFullUserProfile>} - The user's profile information
     */
    function getProfileInfo(cookies: Array<string> | null, user: string): Promise<GetFullUserProfile>;
    namespace getProfileInfo {
        export { GetFullUserProfile, GetFullUserProfileUser };
    }
    type GetFullUserProfile = {
        data: {
            actorIsImpersonatingUser: boolean;
            user: GetFullUserProfileUser | null;
        };
    };
    type GetFullUserProfileUser = {
        __typename: "User";
        authEmails: string | null;
        autocontinueOn: boolean | null;
        badgeCounts: string | null;
        bio: string;
        canAccessDistrictsHomepage: boolean;
        canHellban: boolean | null;
        canMessageUsers: boolean | null;
        canModifyCoaches: boolean | null;
        countVideosCompleted: number;
        email: string | null;
        gaUserId: string | null;
        hasChildren: boolean | null;
        hasClasses: boolean | null;
        hasCoach: boolean | null;
        hasStudents: boolean | null;
        hideVisual: boolean | null;
        homepageUrl: string | null;
        id: string;
        includesDistrictOwnedData: boolean;
        isChild: boolean | null;
        isCoachingLoggedInUser: boolean;
        isCreator: boolean | null;
        isCurator: boolean | null;
        isDataCollectible: boolean | null;
        isDeveloper: boolean | null;
        isMidsignupPhantom: boolean;
        isModerator: boolean | null;
        isOrphan: boolean | null;
        isParent: boolean | null;
        isPhantom: boolean;
        isPublisher: boolean | null;
        isSatStudent: boolean | null;
        isSelf: boolean;
        isTeacher: boolean | null;
        joined: string | null;
        kaid: string;
        key: string | null;
        muteVideos: boolean | null;
        newNotificationCount: number | null;
        nickname: string;
        noColorInVideos: boolean | null;
        pendingEmailVerifications: unknown[] | null;
        points: number;
        preferredKaLocale: unknown | null;
        prefersReducedMotion: boolean | null;
        profile: {
            __typename: "Profile";
            accessLevel: string;
        };
        profileRoot: string;
        qualarooId: string | null;
        shouldShowAgeCheck: boolean | null;
        showCaptions: boolean | null;
        signupDataIfUnverified: unknown | null;
        soundOn: boolean | null;
        tosAccepted: boolean | null;
        underAgeGate: unknown | null;
        userId: string | null;
        username: string | null;
    };
}
declare module "queries/getProfileWidgets" {
    export = GET_PROFILE_WIDGETS_QUERY;
    const GET_PROFILE_WIDGETS_QUERY: "query getProfileWidgets($kaid: String!) {\n  user(kaid: $kaid) {\n    id\n    kaid\n    badgeCounts\n    isChild\n    profile {\n      programs {\n        authorKaid\n        authorNickname\n        deleted\n        displayableSpinoffCount\n        imagePath\n        key\n        sumVotesIncremented\n        translatedTitle\n        url\n        __typename\n      }\n      __typename\n    }\n    programsDeprecated(limit: 2) {\n      authorKaid\n      authorNickname\n      displayableSpinoffCount\n      imagePath\n      key\n      sumVotesIncremented\n      translatedTitle\n      url\n      __typename\n    }\n    __typename\n  }\n  userSummary(kaid: $kaid) {\n    statistics {\n      answers\n      comments\n      flags\n      projectanswers\n      projectquestions\n      questions\n      replies\n      votes\n      __typename\n    }\n    __typename\n  }\n}\n";
}
declare module "profile/getProfileWidgets" {
    export = getProfileWidgets;
    /**
     * Get a user's profile information given their KAID
     *
     * @param {Array<string>|null} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} kaid - The requested user's KAID
     *
     * @returns {Promise<GetProfileWidgets>} - The user's profile information
     */
    function getProfileWidgets(cookies: Array<string> | null, kaid: string): Promise<GetProfileWidgets>;
    namespace getProfileWidgets {
        export { GetProfileWidgets, GetProfileWidgetsData, GetProfileWidgetsUser, GetProfileWidgetsUserSummary, GetFullUserProfileProgram, GetFullUserProfileProgramDeprecated, getProfileWidgetsErrors, getProfileWidgetsErrorsMessage, getProfileWidgetsErrorsMessageExtensions };
    }
    type GetProfileWidgets = {
        data: GetProfileWidgetsData | undefined;
        errors: getProfileWidgetsErrors | undefined;
    };
    type GetProfileWidgetsData = {
        user: GetProfileWidgetsUser | null;
        userSummary: GetProfileWidgetsUserSummary | null;
    };
    type GetProfileWidgetsUser = {
        __typename: "User";
        badgeCounts: string | null;
        id: string;
        isChild: unknown | null;
        kaid: string;
        profile: {
            __typename: "Profile";
            programs: Array<GetFullUserProfileProgram>;
        };
        programsDeprecated: Array<GetFullUserProfileProgramDeprecated>;
    };
    type GetProfileWidgetsUserSummary = {
        __typename: "UserSummary";
        statistics: {
            __typename: "UserStatistics";
            answers: number;
            comments: number;
            flags: 0;
            projectanswers: number;
            projectquestions: number;
            questions: number;
            replies: number;
            votes: number;
        };
    };
    type GetFullUserProfileProgram = {
        __typename: "Program";
        authorKaid: string | null;
        authorNickname: string | null;
        deleted: unknown | null;
        displayableSpinoffCount: number;
        imagePath: string;
        key: string;
        sumVotesIncremented: number;
        translatedTitle: string;
        url: string;
    };
    type GetFullUserProfileProgramDeprecated = {
        __typename: "Program";
        authorKaid: string | null;
        authorNickname: string | null;
        displayableSpinoffCount: number;
        imagePath: string;
        key: string;
        sumVotesIncremented: number;
        translatedTitle: string;
        url: string;
    };
    type getProfileWidgetsErrors = Array<getProfileWidgetsErrorsMessage>;
    type getProfileWidgetsErrorsMessage = {
        message: string;
        extensions: string | undefined;
    };
    type getProfileWidgetsErrorsMessageExtensions = {
        code: string;
        serviceName: string;
    };
}
declare module "queries/avatarDataForProfile" {
    export = AVATAR_DATA_FOR_PROFILE_QUERY;
    const AVATAR_DATA_FOR_PROFILE_QUERY: "query avatarDataForProfile($kaid: String!) {\n  user(kaid: $kaid) {\n    id\n    avatar {\n      name\n      imageSrc\n      __typename\n    }\n    __typename\n  }\n}\n";
}
declare module "profile/avatarDataForProfile" {
    export = avatarDataForProfile;
    /**
     * Get a user's avatar information given their KAID
     *
     * @param {Array<string>|null} cookies - A list of cookies returned from the server (set-cookie header)
     * @param {string} kaid - The requested user's KAID
     *
     * @returns {Promise<AvatarDataForProfile>} - The user's avatar information
     */
    function avatarDataForProfile(cookies: Array<string> | null, kaid: string): Promise<AvatarDataForProfile>;
    namespace avatarDataForProfile {
        export { AvatarDataForProfile, AvatarDataForProfileUser };
    }
    type AvatarDataForProfile = {
        data: {
            user: AvatarDataForProfileUser | null;
        };
    };
    type AvatarDataForProfileUser = {
        __typename: "User";
        avatar: {
            __typename: "Avatar";
            imageSrc: string;
            name: string;
        };
        id: string;
        /**
         * *
         */
        kaid: string;
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
    export type GetUserPrograms = {
        cursor: string | undefined;
        scratchpads: Array<GetUserProgramsScratchpad>;
        complete: boolean;
    };
    export type GetUserProgramsScratchpad = {
        thumb: string;
        created: string;
        authorKaid: string;
        title: string;
        sumVotesIncremented: number;
        flaggedByUser: boolean;
        url: string;
        key: string;
        authorNickname: string;
        spinoffCount: number;
        translatedTitle: string;
    };
    /**
     *
     * @param {string} user The user's KAID or username
     * @param {SORTING_TYPE} [sortingType=1] The sorting type (default is most votes)
     * @param {number} [limit=1e4] The maximum number of programs to retrieve
     *
     * @returns {Promise<GetUserPrograms>} The JSON
     */
    export function getUserPrograms(user: string, sortingType?: Readonly<{
        MOST_VOTES: "MOST_VOTES";
        NEWEST: "NEWEST";
    }>, limit?: number): Promise<GetUserPrograms>;
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
    export type ShowScratchpad = {
        scratchpad: {
            contentKindCode: string;
            newUrlPath: string;
            key: string;
            relativeUrl: string;
            originScratchpadId: number | null;
            forkedFromTopic: string;
            height: number;
            date: string;
            originSimilarity: number;
            id: number;
            editSlug: string;
            category: unknown | null;
            originRevisionId: number | null;
            title: string;
            translatedProjectEval: unknown | null;
            sendToPeers: boolean;
            nodeSlug: string;
            isChallenge: boolean;
            width: number;
            youtubeId: unknown | null;
            docsUrlPath: string;
            contentKind: string;
            type: string;
            revision: {
                tests: unknown | null;
                code: string;
                created: string;
                folds: [number, number][];
                translatedMp3Url: unknown | null;
                hasAudio: boolean;
                mp3Url: unknown | null;
                editorType: string;
                playback: unknown | null;
                youtubeId: unknown | null;
                configVersion: number;
                id: number;
            };
            imagePath: string;
            nodeType: string;
            description: string;
            isProject: boolean;
            tags: unknown[];
            translatedDescription: string;
            byChild: boolean;
            difficulty: unknown | null;
            originIsProject: boolean;
            hideFromHotlist: boolean;
            canvasOnly: boolean;
            slug: string;
            spinoffCount: number;
            kind: string;
            created: string;
            url: string;
            imageUrl: string;
            isPublished: boolean;
            sumVotesIncremented: number;
            defaultUrlPath: unknown | null;
            flags: unknown[];
            isProjectOrFork: boolean;
            translatedProjectEvalTips: unknown | null;
            userAuthoredContentType: string;
            kaid: string;
            translatedTitle: string;
        };
        embedded: boolean;
        creatorProfile: {
            isSelf: boolean;
            countVideosCompleted: number;
            isChildAccount: boolean;
            hasChangedAvatar: boolean;
            soundOn: boolean;
            affiliation: unknown | null;
            autocontinueOn: boolean;
            backgroundSrc: string;
            noColorInVideos: boolean;
            hideVisual: boolean;
            muteVideos: unknown | null;
            isDataCollectible: boolean;
            avatarName: string;
            globalPermissions: any;
            affiliation_country_code: unknown | null;
            profileRoot: string;
            email: string;
            username: string;
            bio: string;
            backgroundName: string;
            isOrphan: boolean;
            isPublic: boolean;
            background: {
                translatedDisplayName: string;
                imagePath: string;
                displayName: string;
                name: string;
                thumbSrc: string;
                translatedRequirements: any;
                rewardType: string;
                thumbnailSrc: string;
                imageSrc: string;
                thumbnailPath: string;
                thumbPath: string;
            };
            isPhantom: boolean;
            isMidsignupPhantom: boolean;
            nickname: string;
            kaid: string;
            prefersReducedMotion: boolean;
            dateJoined: unknown | null;
            avatarSrc: string;
            userLocation: unknown | null;
            points: number;
            avatar: {
                translatedDisplayName: string;
                imagePath: string;
                displayName: string;
                name: string;
                partType: string;
                forModel: string;
                translatedRequirements: any;
                rewardType: string;
                thumbnailSrc: string;
                imageSrc: string;
                thumbnailPath: string;
            };
            includesUserDataInfo: boolean;
            publicBadges: any;
        };
        discussion: {
            showProjectFeedback: boolean;
            focusId: string;
            isOwner: boolean;
            restrictPosting: boolean;
            focusKind: string;
            canEdit: boolean;
        };
        upVoted: boolean;
        originScratchpad: unknown | null;
        topic: {
            curriculumKey: unknown | null;
            relativeUrl: string;
            userAuthoredContentTypesInfo: {
                new: string;
                type: string;
            };
            extendedSlug: string;
            currentRevisionKey: string;
            renderType: string;
            topicPageUrl: string;
            alternateSlugs: string[];
            hasPeerReviewedProjects: boolean;
            id: string;
            domainSlug: string;
            backgroundImageCaption: string;
            userAuthoredContentTypes: string[];
            creationDate: string;
            hide: boolean;
            title: string;
            webUrl: string;
            nodeSlug: string;
            deletedModTime: string;
            endorsement: unknown | null;
            iconSrc: string;
            contentKind: string;
            standaloneTitle: string;
            translatedStandaloneTitle: string;
            twitterUrl: string;
            brandingImageUrl: string;
            description: string;
            tags: any;
            deleted: boolean;
            hasUserAuthoredContentTypes: boolean;
            translatedDescription: string;
            inKnowledgeMap: boolean;
            gplusUrl: string;
            doNotPublish: boolean;
            backgroundImageUrl: string;
            childData: {
                kind: string;
                id: string;
            };
            slug: string;
            kind: string;
            listedLocales: string[];
            contentId: string;
            logoImageUrl: string;
            kaUrl: string;
            sha: string;
            facebookUrl: string;
            curation: {
                blacklist: string[];
                modules: {
                    kind: string;
                    actions: {
                        url: string;
                        text: string;
                        content_descriptor: string;
                    };
                    title: string;
                    call_to_action: string;
                    link: string;
                    description: string;
                };
            };
            translatedTitle: string;
        };
        flaggedByUser: boolean;
        downVoted: boolean;
        userScratchpad: {
            kind: string;
            msWatched: number;
            isProject: boolean;
            msDuration: unknown | null;
            lastMsWatched: number;
            challengeStatus: number;
            scratchpadKey: string;
            fullyWatched: boolean;
            isComplete: boolean;
            isChallenge: boolean;
            difficulty: unknown | null;
            points: number;
            stashedCode: string;
            lastUpdated: string;
            key: string;
            userKey: string;
            id: string;
            viewed: boolean;
        };
    };
    /**
     * Returns the program info, given the program's ID
     *
     * @param {number|string} id The program's ID
     */
    export function getProgramJSON(id: number | string): Promise<any>;
    /**
     * Returns the program and author info, given the program's ID
     *
     * @param {number|string} id The program's ID
     *
     * @return {ShowScratchpad|string}
     */
    export function showScratchpad(id: number | string): ShowScratchpad | string;
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
     * @param {number|string} originalProgram - The original program's ID
     * @param {string} code - The code in the spinoff
     * @param {object} [settings] Settings to override the JSON request
     * @param {object} [originalProgramJSON] The program json if already retrieved (to reduce unnecessary requests)
     */
    export function spinOffProgram(cookies: Array<string>, originalProgram: number | string, code: string, settings?: object, originalProgramJSON?: object): Promise<any>;
    /**
     * Updates an existing program based on the parameters
     *
     * @param {Array} cookies An array of set-cookie response headers from axios
     * @param {number|string} programId The program's ID being updated
     * @param {string} code The code
     * @param {object} [settings] Settings to override the JSON request
     * @param {object} [programJson] The program json if already retrieved (to reduce unnecessary requests)
     */
    export function updateProgram(cookies: any[], programId: number | string, code: string, settings?: object, programJson?: object): Promise<any>;
    /**
     * Deletes a program
     *
     * @param {Array} cookies - An array of set-cookie response headers from axios
     * @param {number|string} programId - The program ID
     */
    export function deleteProgram(cookies: any[], programId: number | string): Promise<any>;
}
declare module "programs/getSpinoffs" {
    export function getSpinoffs(programId: any, sortingType: any, limit: any): Promise<any>;
}
declare module "utils" {
    export const VALID_KAID_LENGTHS: number[];
    export const KaidRegex: RegExp;
    export const VALID_PROGRAM_ID_LENGTHS: number[];
    export const ProgramIDRegex: RegExp;
    /**
     * Checks if the input is a valid KAID
     *
     * @param {string} input
     * @returns {boolean}
     */
    export function isValidKaid(input: string): boolean;
    /**
     * Checks if the input is a valid program ID
     *
     * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L1
     *
     * @param {number|string} input
     * @returns {boolean}
     */
    export function isValidProgramID(input: number | string): boolean;
    /**
     * Extracts the program ID from a program URL
     *
     * @link https://github.com/bhavjitChauhan/khanalytics/blob/a5d9c865bf7953a7ed8dff6074ba232acebc6cfe/client/src/util/programID.js#L16
     *
     * @param {string} url
     * @returns {string}
     */
    export function extractProgramID(url: string): string;
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
        getProfileWidgets: typeof import("profile/getProfileWidgets");
        avatarDataForProfile: typeof import("profile/avatarDataForProfile");
    };
    export const programs: {
        getSpinoffs: typeof import("programs/getSpinoffs").getSpinoffs;
        getProgramJSON: typeof import("programs/programs").getProgramJSON;
        showScratchpad: typeof import("programs/programs").showScratchpad;
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
    export const utils: {
        VALID_KAID_LENGTHS: number[];
        KaidRegex: RegExp;
        VALID_PROGRAM_ID_LENGTHS: number[];
        ProgramIDRegex: RegExp;
        isValidKaid: typeof import("utils").isValidKaid;
        isValidProgramID: typeof import("utils").isValidProgramID;
        extractProgramID: typeof import("utils").extractProgramID;
    };
    export const config: {
        filterBadwords: boolean;
    };
}

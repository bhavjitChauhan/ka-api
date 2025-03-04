const GET_FULL_USER_PROFILE_QUERY = `query getFullUserProfile($kaid: String, $username: String) {
  user(kaid: $kaid, username: $username) {
    id
    kaid
    key
    userId
    email
    username
    profileRoot
    gaUserId
    qualarooId
    isPhantom
    isDeveloper: hasPermission(name: "can_do_what_only_admins_can_do")
    isCurator: hasPermission(name: "can_curate_tags", scope: ANY_ON_CURRENT_LOCALE)
    isCreator: hasPermission(name: "has_creator_role", scope: ANY_ON_CURRENT_LOCALE)
    isPublisher: hasPermission(name: "can_publish", scope: ANY_ON_CURRENT_LOCALE)
    isModerator: hasPermission(name: "can_moderate_users", scope: GLOBAL)
    isParent
    isSatStudent
    isTeacher
    isDataCollectible
    isChild
    isOrphan
    isCoachingLoggedInUser
    canModifyCoaches
    nickname
    hideVisual
    joined
    points
    countVideosCompleted
    bio
    profile {
      accessLevel
      __typename
    }
    soundOn
    muteVideos
    showCaptions
    prefersReducedMotion
    noColorInVideos
    autocontinueOn
    newNotificationCount
    canHellban: hasPermission(name: "can_ban_users", scope: GLOBAL)
    canMessageUsers: hasPermission(name: "can_send_moderator_messages", scope: GLOBAL)
    isSelf: isActor
    hasStudents: hasCoachees
    hasClasses
    hasChildren
    hasCoach
    badgeCounts
    homepageUrl
    isMidsignupPhantom
    includesDistrictOwnedData
    canAccessDistrictsHomepage
    preferredKaLocale {
      id
      kaLocale
      status
      __typename
    }
    underAgeGate {
      parentEmail
      daysUntilCutoff
      approvalGivenAt
      __typename
    }
    authEmails
    signupDataIfUnverified {
      email
      emailBounced
      __typename
    }
    pendingEmailVerifications {
      email
      __typename
    }
    tosAccepted
    shouldShowAgeCheck
    __typename
  }
  actorIsImpersonatingUser
}
`;

module.exports = GET_FULL_USER_PROFILE_QUERY;

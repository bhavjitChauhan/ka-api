const GET_PROFILE_WIDGETS_QUERY = `query getProfileWidgets($kaid: String!) {
  user(kaid: $kaid) {
    id
    kaid
    badgeCounts
    isChild
    profile {
      programs {
        authorKaid
        authorNickname
        deleted
        displayableSpinoffCount
        imagePath
        key
        sumVotesIncremented
        translatedTitle
        url
        __typename
      }
      __typename
    }
    programsDeprecated(limit: 2) {
      authorKaid
      authorNickname
      displayableSpinoffCount
      imagePath
      key
      sumVotesIncremented
      translatedTitle
      url
      __typename
    }
    __typename
  }
  userSummary(kaid: $kaid) {
    statistics {
      answers
      comments
      flags
      projectanswers
      projectquestions
      questions
      replies
      votes
      __typename
    }
    __typename
  }
}
`;

module.exports = GET_PROFILE_WIDGETS_QUERY;

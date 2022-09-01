const FEEDBACK_QUERY = `query feedbackQuery($topicId: String!, $focusKind: String!, $cursor: String, $limit: Int, $feedbackType: FeedbackType!, $currentSort: Int) {
  feedback(focusId: $topicId, cursor: $cursor, limit: $limit, feedbackType: $feedbackType, focusKind: $focusKind, sort: $currentSort) {
    feedback {
      replyCount
      appearsAsDeleted
      author {
        id
        kaid
        nickname
        avatar {
          name
          imageSrc
          __typename
        }
        __typename
      }
      badges {
        name
        icons {
          smallUrl
          __typename
        }
        description
        __typename
      }
      content
      date
      definitelyNotSpam
      deleted
      downVoted
      expandKey
      feedbackType
      flaggedBy
      flaggedByUser
      flags
      focusUrl
      focus {
        kind
        id
        translatedTitle
        relativeUrl
        __typename
      }
      fromVideoAuthor
      key
      lowQualityScore
      notifyOnAnswer
      permalink
      qualityKind
      replyCount
      replyExpandKeys
      showLowQualityNotice
      sumVotesIncremented
      upVoted
      ... on QuestionFeedback {
        hasAnswered
        answers {
          replyCount
          appearsAsDeleted
          author {
            id
            kaid
            nickname
            avatar {
              name
              imageSrc
              __typename
            }
            __typename
          }
          badges {
            name
            icons {
              smallUrl
              __typename
            }
            description
            __typename
          }
          content
          date
          definitelyNotSpam
          deleted
          downVoted
          expandKey
          feedbackType
          flaggedBy
          flaggedByUser
          flags
          focusUrl
          focus {
            kind
            id
            translatedTitle
            relativeUrl
            __typename
          }
          fromVideoAuthor
          key
          lowQualityScore
          notifyOnAnswer
          permalink
          qualityKind
          replyCount
          replyExpandKeys
          showLowQualityNotice
          sumVotesIncremented
          upVoted
          __typename
        }
        isOld
        __typename
      }
      ... on AnswerFeedback {
        question {
          replyCount
          appearsAsDeleted
          author {
            id
            kaid
            nickname
            avatar {
              name
              imageSrc
              __typename
            }
            __typename
          }
          badges {
            name
            icons {
              smallUrl
              __typename
            }
            description
            __typename
          }
          content
          date
          definitelyNotSpam
          deleted
          downVoted
          expandKey
          feedbackType
          flaggedBy
          flaggedByUser
          flags
          focusUrl
          focus {
            kind
            id
            translatedTitle
            relativeUrl
            __typename
          }
          fromVideoAuthor
          key
          lowQualityScore
          notifyOnAnswer
          permalink
          qualityKind
          replyCount
          replyExpandKeys
          showLowQualityNotice
          sumVotesIncremented
          upVoted
          __typename
        }
        __typename
      }
      __typename
    }
    cursor
    isComplete
    sortedByDate
    __typename
  }
}
`;
module.exports = FEEDBACK_QUERY;

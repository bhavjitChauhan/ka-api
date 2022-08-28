const LOGIN_QUERY = `mutation loginWithPasswordMutation($identifier: String!, $password: String!) {
  loginWithPassword(identifier: $identifier, password: $password) {
    user {
      id
      kaid
      canAccessDistrictsHomepage
      isTeacher
      hasUnresolvedInvitations
      transferAuthToken
      preferredKaLocale {
        id
        kaLocale
        status
        __typename
      }
      __typename
    }
    isFirstLogin
    error {
      code
      __typename
    }
    __typename
  }
}
`;

module.exports = LOGIN_QUERY;

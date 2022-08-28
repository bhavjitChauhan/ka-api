const AVATAR_DATA_FOR_PROFILE_QUERY = `query avatarDataForProfile($kaid: String!) {
  user(kaid: $kaid) {
    id
    avatar {
      name
      imageSrc
      __typename
    }
    __typename
  }
}
`;

module.exports = AVATAR_DATA_FOR_PROFILE_QUERY;

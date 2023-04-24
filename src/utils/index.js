export const getMediaIcon = (mediaType) => {
  switch (mediaType) {
    case "albums":
      return "💿";
    case "track":
      return "🎶";
    case "podcasts":
      return "💿";

    case "audiobook":
      return "📙";

    default:
      return "💿";
  }
};

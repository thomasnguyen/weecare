export const fetchMediaData = async (mediaType) => {
  let apiUrl;
  switch (mediaType) {
    case "albums":
      apiUrl = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
      break;
    case "songs":
      apiUrl = "https://itunes.apple.com/us/rss/topsongs/limit=100/json";
      break;
    case "podcasts":
      apiUrl = "https://itunes.apple.com/us/rss/toppodcasts/limit=100/json";
      break;
    case "audioBooks":
      apiUrl = "https://itunes.apple.com/us/rss/topaudiobooks/limit=100/json";
      break;
    default:
      apiUrl = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.feed.entry;
  } catch (error) {
    console.error(error);
    return [];
  }
};

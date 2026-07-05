import axios from 'axios';

interface YouTubeSearchItem {
    id: { videoId: string };
    snippet: { title: string; channelTitle: string };
}

interface YouTubeSearchResponse {
    items?: YouTubeSearchItem[];
}

/**
 * Search YouTube for a video.
 * @param name        - search query
 * @param channelIds  - optional list of YouTube channel IDs to restrict search to
 */
export async function youtubeVideoForCourse(name: string, channelIds: string[] = []): Promise<string> {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // 🔑 Replace with your YouTube Data API v3 key
    const query = encodeURIComponent(`${name}`);

    // If specific channels are requested, search each one and return the first hit.
    if (channelIds.length > 0) {
        for (const channelId of channelIds) {
            try {
                const { data } = await axios.get<YouTubeSearchResponse>('https://www.googleapis.com/youtube/v3/search', {
                    params: { part: 'snippet', q: query, channelId, type: 'video', maxResults: 1, key: YOUTUBE_API_KEY },
                });
                const items = data.items;
                if (items && items.length > 0) {
                    const videoId = items[0].id.videoId;
                    const title = items[0].snippet.title;
                    const channelName = items[0].snippet.channelTitle;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    return `Title: "${title}" by ${channelName} → ${videoUrl}`;
                }
            } catch {
                // channel search failed — try the next channel
                continue;
            }
        }
        return `No videos found for "${name}" on the specified channels.`;
    }

    // Default: search all of YouTube
    try {
        const { data } = await axios.get<YouTubeSearchResponse>('https://www.googleapis.com/youtube/v3/search', {
            params: { part: 'snippet', q: query, type: 'video', maxResults: 1, key: YOUTUBE_API_KEY },
        });
        const items = data.items;
        if (!items || items.length === 0) return `No YouTube videos found for "${name}"`;

        const videoId = items[0].id.videoId;
        const title = items[0].snippet.title;
        const channelName = items[0].snippet.channelTitle;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        return `Title: "${title}" by ${channelName} → ${videoUrl}`;
    } catch (err) {
        const error = err as Error;
        return `Failed to fetch YouTube results: ${error.message}`;
    }
}

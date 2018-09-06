import {initializeFacebookApi} from "./facebook/facebook.provider";
import {initializeYouTubeIframeApi} from "./youtube/youtube.provider";

export const initThirdPartyProviders = (): Promise<any[]> => {
    return Promise.all([
        initializeFacebookApi(),
        initializeYouTubeIframeApi()
    ]);
};

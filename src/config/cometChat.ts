import { CometChat } from "@cometchat/chat-sdk-javascript";

const APP_ID = "2768710f8393f918"; // Replace with your CometChat App ID
const REGION = "in"; // Replace with your CometChat Region
const AUTH_KEY = "50937fa4498bd19f486ba4814450a6f0ef3653dc";

export const initCometChat = async () => {
    try {
        const appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(REGION)
            .build();

        await CometChat.init(APP_ID, appSetting);
        console.log("CometChat initialized successfully");
    } catch (error) {
        console.error("CometChat initialization failed:", error);
    }
};

export { APP_ID, REGION, AUTH_KEY }; 
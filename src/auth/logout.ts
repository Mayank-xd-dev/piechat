import { CometChat } from "@cometchat/chat-sdk-javascript";

export const logout = async () => {
    await CometChat.logout();
    window.location.href = "/login";
}; 
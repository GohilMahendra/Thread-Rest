import { Platform } from "react-native"

export const BASE_URL = (Platform.OS == "android") ? "http://10.0.2.2:3000/"
: "http://localhost:3000/"

export const PAGE_SIZE = 3
export const CHARACTER_LIMIT = 500


export const SocketEmitEvent = 
{
    NEW_MESSAGE:"newMessage",
    USER_CONVERSATION:"userConversation",
    TYPE_EVENT : "TypeEvent",
    LEAVE_ACTIVE_CONVERSATION:"leaveActiveConversation"
    
}   

export const SocketSubscribeEvent = 
{
 
    CONNECT : "connect",
    NEW_MESSAGE_NOTIFICATION:"newMessageNotification",
    NEW_MESSAGE:"newMessage",
    ON_TYPE_EVENT:"onTypeEvent",
}
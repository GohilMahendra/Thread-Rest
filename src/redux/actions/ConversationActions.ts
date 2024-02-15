import { createAsyncThunk } from "@reduxjs/toolkit"
import { Channel } from "../../types/Messages";
import { getConversations, getUnreadCount } from "../../apis/ConversationApi";
import { RootState } from "../store";
export const fetchConversations = createAsyncThunk(
    "Conversations/fetchConversations",
    async (fakeArg: string = "", { rejectWithValue, getState }) => {
        try {
            const response = await getConversations()
            const state = getState() as RootState
            const userId = state.User.user._id
            const data = response.data
            let conversations: Channel[] = []
            for (const item of data) {
                const otherUser = item.members.find((member: any) => member.user._id !== userId);
                const currentUser = item.members.find((member: any) => member.user._id == userId);
                conversations.push({
                    _id: item._id,
                    created_at: item.created_at,
                    member: otherUser.user,
                    updated_at: item.updated_at,
                    lastMessage: item?.lastMessage,
                    unread_messages: currentUser.unread_count
                })
            }
            return {
                data: conversations
            }
        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })

export const fetchUnreadCount = createAsyncThunk(
    "Conversations/fetchUnreadCount",
    async (fakeArg: string = "", { rejectWithValue, getState }) => {
        try {
            const response = await getUnreadCount()
            return {
                count: response.total_unread_count
            }
        }
        catch (err) {
        
            return rejectWithValue(JSON.stringify(err))
        }
    })
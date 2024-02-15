import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Channel } from "../../types/Messages";
import { fetchConversations, fetchUnreadCount } from "../actions/ConversationActions";
type ConversationsSliceType =
    {
        conversations: Channel[],
        loading: boolean,
        error: string | null,
        unread_messages: number
    }

const initialState: ConversationsSliceType =
{
    conversations: [],
    error: null,
    loading: false,
    unread_messages: 0
}


export const ConversationSlice = createSlice({
    name: "Conversations",
    initialState: initialState,
    reducers: {
        readAll:(state,action:PayloadAction<string>)=>{
            const senderId = action.payload
            state.conversations = state.conversations.map(conversation => {
                if (conversation.member._id === senderId) {
                    state.unread_messages-= conversation.unread_messages
                    return {
                        ...conversation,
                        unread_messages: 0
                    };
                }
                return conversation;
            });
        },
        updateUnreadCount: (state, action: PayloadAction<string>) => {
            const senderId = action.payload;
            state.unread_messages++
            state.conversations = state.conversations.map(conversation => {
                if (conversation.member._id === senderId) {
                    return {
                        ...conversation,
                        unread_messages: conversation.unread_messages + 1
                    };
                }
                return conversation;
            });
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchConversations.pending, (state) => {
            state.loading = false
            state.error = null
        })
        builder.addCase(fetchConversations.fulfilled, (state, action: PayloadAction<{ data: Channel[] }>) => {
            state.conversations = action.payload.data
            const unreadCount = action.payload.data.reduce((totalUnread, conversation) => {
                return totalUnread + conversation.unread_messages;
            }, 0);
            state.unread_messages = unreadCount
            state.loading = false
        })
        builder.addCase(fetchConversations.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        builder.addCase(fetchUnreadCount.fulfilled,(state,action:PayloadAction<{count:number}>)=>{
            console.log(action.payload.count,"count from bckend")
            state.unread_messages = action.payload.count
        })
    },
})
export const { updateUnreadCount,readAll } = ConversationSlice.actions
export default ConversationSlice.reducer

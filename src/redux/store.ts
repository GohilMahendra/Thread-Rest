import React from "react";
import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import FeedReducer from "./slices/FeedSlice";
import SearchReducer from "./slices/SearchSlice";
import ReplyReducer from "./slices/ReplySlice";
import FavoriteReducer from "./slices/FavoritesSlice";
import PostSearchReducer from "./slices/PostSearchSlice";
import ConversationsReducer from "./slices/ConversationSlice";
import CallReducer from "./slices/CallSlice";
// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
//   };

const RootReducer = combineReducers({
    User: UserReducer,
    Feed: FeedReducer,
    Search: SearchReducer,
    Reply: ReplyReducer,
    Favorite: FavoriteReducer,
    PostSearch: PostSearchReducer,
    Conversations: ConversationsReducer,
    Call: CallReducer
})
const store = configureStore({
    reducer: RootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import FeedReducer from "./slices/FeedSlice";
import  SearchReducer  from "./slices/SearchSlice";
import  ReplyReducer  from "./slices/ReplySlice";
import  FavoriteReducer  from "./slices/FavoritesSlice";
import PostSearchReducer from "./slices/PostSearchSlice";
const store = configureStore({
    reducer:{
        User: UserReducer,
        Feed: FeedReducer,
        Search: SearchReducer,
        Reply: ReplyReducer,
        Favorite:FavoriteReducer,
        PostSearch: PostSearchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch : () => AppDispatch = useDispatch
export default store
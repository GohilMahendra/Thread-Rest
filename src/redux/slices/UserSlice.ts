import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { SignUpArgsType, UpdateArgsType, User, UserResponse } from "../../types/User";
import { deleteUserPost, fetchUserPosts, loginUser, signUpUser, updateUser } from "../../apis/UserAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Thread } from "../../types/Post";
import { RootState } from "../store";
import { FetchPostsPayload } from "../types/global";
type UserStateType =
    {
        user: User,
        Posts: Thread[],
        loading: boolean,
        error: null | string,
        morePostsLoading: boolean,
        morePostsError: null | string,
        lastOffset: string | null
    }

const initalUser: User =
{
    email: "",
    followers: 0,
    following: 0,
    _id: "",
    bio: "",
    username: "",
    fullname: "",
    verified: false,
    profile_picture: "",
}
const initialState: UserStateType =
{
    user: initalUser,
    loading: false,
    error: null,
    Posts: [],
    lastOffset: null,
    morePostsError: null,
    morePostsLoading: false
}

export const SignInAction = createAsyncThunk(
    "user/SignInAction",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser(email, password)
            const userResponse = response.user as UserResponse
            await AsyncStorage.setItem("token", userResponse.token)
            await AsyncStorage.setItem("email", email)
            await AsyncStorage.setItem("password", password)
            const user: User =
            {
                email: userResponse.email,
                followers: userResponse.followers,
                following: userResponse.following,
                _id: userResponse._id,
                username: userResponse.username,
                profile_picture: userResponse.profile_picture,
                fullname: userResponse.fullname,
                bio: userResponse.bio,
                verified: userResponse.verified
            }
            return user
        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })
export const SignUpAction = createAsyncThunk(
    "user/SignUpAction",
    async (args: SignUpArgsType, { rejectWithValue }) => {
        try {
            const response = await signUpUser(args)
            return response.message
        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })
export const UpdateAction = createAsyncThunk(
    "user/UpdateAction",
    async (args: UpdateArgsType, { rejectWithValue }) => {
        try {
            const response = await updateUser(args)
            return response.message
        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })

export const FetchUserPostsAction = createAsyncThunk(
    "Feed/FetchPostsAction",
    async (fakeArg: string = "", { rejectWithValue }) => {
        try {
            const response = await fetchUserPosts(3)
            const posts: Thread[] = []
            const theads: Thread[] = response.data
            theads.forEach((item, index) => {
                const post: Thread =
                {
                    _id: item._id,
                    content: item.content,
                    created_at: item.created_at,
                    hashtags: item.hashtags,
                    isLiked: item.isLiked,
                    isRepost: item.isRepost,
                    likes: item.likes,
                    media: item.media,
                    replies: item.replies,
                    Repost: item.Repost,
                    updated_at: item.updated_at,
                    user: item.user
                }
                posts.push(post)
            })

            return {
                data: posts,
                lastOffset: response.meta.lastOffset
            }

        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })

export const FetchMoreUserPostsAction = createAsyncThunk(
    "Feed/FetchMorePostsAction",
    async (fakeArg: string = "", { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState
            const lastOffset = state.Feed.lastOffset
            if (!lastOffset) {
                return {
                    data: [],
                    lastOffset: null
                }
            }
            const response = await fetchUserPosts(2, lastOffset)
            const posts: Thread[] = []
            const theads: Thread[] = response.data
            theads.forEach((item, index) => {
                const post: Thread =
                {
                    _id: item._id,
                    content: item.content,
                    created_at: item.created_at,
                    hashtags: item.hashtags,
                    isLiked: item.isLiked,
                    isRepost: item.isRepost,
                    likes: item.likes,
                    media: item.media,
                    replies: item.replies,
                    Repost: item.Repost,
                    updated_at: item.updated_at,
                    user: item.user
                }
                posts.push(post)
            })

            return {
                data: posts,
                lastOffset: response.meta.lastOffset
            }

        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })

export const DeletePostAction = createAsyncThunk(
    "Feed/DeletePostAction",
    async ({ postId }: { postId: string }, { rejectWithValue, getState }) => {
        try {
            const response = await deleteUserPost(postId)

            return {
                postId: postId
            }
        }
        catch (err) {
            return rejectWithValue(JSON.stringify(err))
        }
    })

export const UserSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(SignInAction.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(SignInAction.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(SignInAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        builder.addCase(SignUpAction.pending, state => {
            state.loading = true
            state.error = null
        })

        builder.addCase(SignUpAction.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(SignUpAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        builder.addCase(FetchUserPostsAction.pending, (state) => {
            state.loading = true
            state.Posts = []
            state.error = null
        })
        builder.addCase(FetchUserPostsAction.fulfilled, (state, action: PayloadAction<FetchPostsPayload<Thread>>) => {
            state.loading = false
            state.Posts = action.payload.data
            state.lastOffset = action.payload.lastOffset
        })
        builder.addCase(FetchUserPostsAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        builder.addCase(FetchMoreUserPostsAction.pending, (state) => {
            state.morePostsLoading = true
            state.morePostsError = null
        })
        builder.addCase(FetchMoreUserPostsAction.fulfilled, (state, action: PayloadAction<FetchPostsPayload<Thread>>) => {
            state.morePostsLoading = false
            console.log(action.payload.lastOffset, "last offset found second time retrival")
            state.Posts.push(...action.payload.data)
            state.lastOffset = action.payload.lastOffset
        })
        builder.addCase(FetchMoreUserPostsAction.rejected, (state, action) => {
            state.morePostsLoading = false
            state.morePostsError = action.payload as string
        })

        builder.addCase(DeletePostAction.pending, state => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(DeletePostAction.fulfilled, (state, action: PayloadAction<{ postId: string }>) => {
            state.loading = false
            const index = state.Posts.findIndex(post => post._id === action.payload.postId);
            if (index !== -1) {
                state.Posts.splice(index, 1);
            }
        })
        builder.addCase(DeletePostAction.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload as string
        })


    }
})
export const { setUser } = UserSlice.actions
export default UserSlice.reducer
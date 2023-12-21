import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Thread } from "../../types/Post";
import { fetchPosts, likePost, unLikePost } from "../../apis/FeedAPI";
import { RootState } from "../store";
import { FetchPostsPayload } from "../types/global";
type FeedStateType = 
{
    Threads: Thread[],
    loading: boolean,
    error: null | string,
    LikeSuccess: boolean,
    loadMoreLoading: boolean,
    loadMoreError: string | null,
    lastOffset: string | null
}

const initialState: FeedStateType = 
{
    Threads:[],
    loading:false,
    error: null,
    LikeSuccess: false,
    loadMoreError:null,
    loadMoreLoading:false,
    lastOffset: null
}



export const FetchPostsAction = createAsyncThunk(
    "Feed/FetchPostsAction",
    async(fakeArg:string="",{rejectWithValue})=>{
        try
        {
           const response =await fetchPosts(3)
           const posts:Thread[] = []
           const theads: Thread[] = response.data
           theads.forEach((item,index)=>{
            const post:Thread = 
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
        catch(err)
        {
            return rejectWithValue(JSON.stringify(err))
        }
})

export const FetchMorePostsAction = createAsyncThunk(
    "Feed/FetchMorePostsAction",
    async(fakeArg:string="",{rejectWithValue,getState})=>{
        try
        {
          const state = getState() as RootState
          const lastOffset = state.Feed.lastOffset
          if(!lastOffset)
          {
            return {
                data: [],
                lastOffset:null
            }
          }
           const response =await fetchPosts(2,lastOffset)
           const posts:Thread[] = []
           const theads: Thread[] = response.data
           theads.forEach((item,index)=>{
            const post:Thread = 
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
        catch(err)
        {
            return rejectWithValue(JSON.stringify(err))
        }
})


export const LikeAction = createAsyncThunk(
    "Feed/LikeAction",
    async({postId}:{postId:string},{rejectWithValue})=>{
       try
       {
        const response = await likePost(postId)
        return {
            postId: postId,
        }
       }
       catch(err)
       {
        console.log(err)
        return rejectWithValue(JSON.stringify(err))
       }
    }
)

export const unLikeAction = createAsyncThunk(
    "Feed/unLikeAction",
    async({postId}:{postId:string},{rejectWithValue})=>{
       try
       {
        const response = await unLikePost(postId)
        return {
            postId: postId,
        }
       }
       catch(err)
       {
        console.log(err)
        return rejectWithValue(JSON.stringify(err))
       }
    }
)

export const repostAction = createAsyncThunk(
    "repost/repostAction",
    async({postId}:{postId:string},{rejectWithValue})=>
    {
        
    }
)

export const FeedSlice = createSlice({
    name:"Feed",
    initialState: initialState,
    reducers:{
    },
    extraReducers(builder){
       builder.addCase(FetchPostsAction.pending,(state)=>{
        state.loading = true,
        state.Threads = [],
        state.error = null
       })
       builder.addCase(FetchPostsAction.fulfilled,(state,action:PayloadAction<FetchPostsPayload<Thread>>)=>{
        state.loading = false
        state.Threads = action.payload.data,
        console.log(action.payload.lastOffset ,"getting last offset in first request")
        state.lastOffset = action.payload.lastOffset
       })
       builder.addCase(FetchPostsAction.rejected,(state,action)=>
       {
        state.loading = false,
        state.error = action.payload as string
       })

       builder.addCase(FetchMorePostsAction.pending,(state)=>{
        state.loadMoreLoading = true,
        state.loadMoreError = null
       })
       builder.addCase(FetchMorePostsAction.fulfilled,(state,action:PayloadAction<FetchPostsPayload<Thread>>)=>{
        state.loadMoreLoading = false
        console.log(action.payload.lastOffset,"last offset found second time retrival")
        state.Threads.push(...action.payload.data)
        state.lastOffset = action.payload.lastOffset
       })
       builder.addCase(FetchMorePostsAction.rejected,(state,action)=>
       {
        state.loadMoreLoading = false,
        state.loadMoreError = action.payload as string
       })

       builder.addCase(LikeAction.pending,(state)=>{
            state.LikeSuccess = false
       })
       builder.addCase(LikeAction.fulfilled,(state,action:PayloadAction<{postId:string}>)=>{
        state.LikeSuccess= true
        const refrence = [...state.Threads]
        const index = refrence.findIndex((item)=>item._id == action.payload.postId)
        refrence[index].isLiked = true
        state.Threads = refrence
       })
       builder.addCase(LikeAction.rejected,(state,payload)=>{
        state.LikeSuccess= false
       })
       builder.addCase(unLikeAction.fulfilled,(state,action:PayloadAction<{postId:string}>)=>{
        state.LikeSuccess= true
        const refrence = [...state.Threads]
        const index = refrence.findIndex((item)=>item._id == action.payload.postId)
        refrence[index].isLiked = false
        state.Threads = refrence
       })
    }
})
export default FeedSlice.reducer
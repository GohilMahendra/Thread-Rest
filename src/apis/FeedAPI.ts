import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { BASE_URL } from "../globals/constants"
import { tokens } from "react-native-paper/lib/typescript/styles/themes/v3/tokens"
import { bool } from "aws-sdk/clients/signer"
import { Media, UploadMedia } from "../types/Post"

const getToken = async () => {
    const token = await AsyncStorage.getItem("token")
    return token
}

type CreatePostArgs =
    {
        media?: UploadMedia[],
        content?: string,
        hashtags?: string[]
    }

export const createPost = async ({ args }: { args: CreatePostArgs }) => {
    try {
        const content = args.content
        const media = args.media
        const hashtags = args.hashtags
        const token = await getToken()
        let formData = new FormData()
        if(content)
        formData.append("content", content)

        formData.append("is_repost", false)
        if (hashtags && hashtags.length > 0) {
            hashtags.forEach((tag, index) => {
                formData.append("hashtags", tag)
            })
        }
        if (media && media.length > 0) {
            media.forEach((tag, index) => {
                formData.append("hashtags", tag)
            })
        }
        const uploadPostResponse = await axios.post(BASE_URL + "posts",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            })
        if (uploadPostResponse.status == 200)
            return uploadPostResponse.data
        else
            throw new Error(uploadPostResponse.data)
    }
    catch (err: any) {
        throw new Error(err)
    }
}

export const createRepost = async (postId:string,content?:string,hashtags?:string[]) => {
    try {
        
        const token = await getToken()
        let formData = new FormData()
        if(content)
        formData.append("content", content)

        formData.append("is_repost", true)
        formData.append("postId",postId)
        if (hashtags && hashtags.length > 0) {
            hashtags.forEach((tag, index) => {
                formData.append("hashtags", tag)
            })
        }
        const uploadPostResponse = await axios.post(BASE_URL + "posts",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': token
                }
            })
        if (uploadPostResponse.status == 200)
            return uploadPostResponse.data
        else
            throw new Error(uploadPostResponse.data)
    }
    catch (err: any) {
        throw new Error(err)
    }
}


export const fetchPosts = async (pageSize: number = 10, lastOffset?: string) => {
    try {
        const token = await getToken()

        let quary = ""

        if (lastOffset) {
            quary = `${BASE_URL}posts?pageSize=${pageSize}&lastOffset=${lastOffset}`
        }
        else {
            quary = `${BASE_URL}posts?pageSize=${pageSize}`
        }

        console.log(quary)

        const response = await axios.get(quary, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        if (response.status == 200) {
            return response.data
        }
        else {
            // console.log(response.data)
            throw Error(JSON.stringify(response.data))
        }
    }
    catch (err) {
        console.log(err)
        throw Error(JSON.stringify(err))
    }
}

export const fetchPostsByUser = async (userId:string,pageSize: number = 10, lastOffset?: string) => {
    try {
        const token = await getToken()

        let quary = ""

        if (lastOffset) {
            quary = `${BASE_URL}posts/${userId}?pageSize=${pageSize}&lastOffset=${lastOffset}`
        }
        else {
            quary = `${BASE_URL}posts/${userId}?pageSize=${pageSize}`
        }

        const response = await axios.get(quary, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
        if (response.status == 200) {
            return response.data
        }
        else {
            // console.log(response.data)
            throw Error(JSON.stringify(response.data))
        }
    }
    catch (err) {
        console.log(err)
        throw Error(JSON.stringify(err))
    }
}


export const likePost = async (postId: string) => {
    try {
        const token = await getToken()
        const response = await axios.post(BASE_URL + `posts/${postId}/likes`, {}, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data
        }
        else {
            throw Error(JSON.stringify(response.data))
        }
    }
    catch (err) {
        throw Error(JSON.stringify(err))
    }
}

export const unLikePost = async (postId: string) => {
    try {
        const token = await getToken()
        const response = await axios.delete(BASE_URL + `posts/${postId}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data
        }
        else {
            throw Error(JSON.stringify(response.data))
        }
    }
    catch (err) {
        throw Error(JSON.stringify(err))
    }
}

export const commentPost = async (postId: string, content: string) => {
    try {
        const token = await getToken()
        const response = await axios.post(BASE_URL + `posts/${postId}/replies`, {
            content: content
        }, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200) {
            return response.data.message
        } else {
            throw new Error(response.data)
        }
    }
    catch (err: any) {
        throw new Error(err)
    }
}

export const fetchComments = async (postId: string, pagesize: number = 10, offset: string | null = null) => {
    try {
        const token = await getToken()

        let quary: string = ""

        if (offset) {
            quary = BASE_URL + `posts/${postId}/replies?pageSize=${pagesize}&lastOffSet=${offset}`
        }
        else {
            quary = BASE_URL + `posts/${postId}/replies?pageSize=${pagesize}`
        }
        const response = await axios.get(quary, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        if (response.status == 200)
            return response.data
        else
            throw new Error(response.data)
    }
    catch (err: any) {
        throw new Error(err)
    }
}
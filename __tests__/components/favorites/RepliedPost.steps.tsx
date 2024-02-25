import { render } from "@testing-library/react-native"
import RepliedPost from "../../../src/components/favorites/RepliedPost"
import { Provider } from "react-redux"
import store from "../../../src/redux/store"


const repliedPost = {
    "_id": "65cba1ab35a8607f7ac5ed3f",
    "user": {
      "_id": "658f059d90236d6afad7490c",
      "username": "netflix",
      "fullname": "Netflix India",
      "email": "mpgohilse03@gmail.com",
      "followers": 10,
      "following": -14,
      "verified": true,
      "isFollowed": false,
      "bio": "A online OTT service giving services in India. Watch the popular shows around the world on demand. Get amazing experince of cinema like envirment at your home",
      "profile_picture": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/user/658f059d90236d6afad7490c/9ad7302e-d2a7-4871-8b05-2d0c3948bade.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=2490b4fc811854566082dd7ed9c5ee917867b8b3e6f97adfc5d79d70435a9e20&X-Amz-SignedHeaders=host"
    },
    "post": {
      "_id": "65bd22f61c1326cb6abf7989",
      "user": {
        "_id": "658f059d90236d6afad7490c",
        "username": "netflix",
        "fullname": "Netflix India",
        "email": "mpgohilse03@gmail.com",
        "followers": 10,
        "following": -14,
        "verified": true,
        "isFollowed": false,
        "bio": "A online OTT service giving services in India. Watch the popular shows around the world on demand. Get amazing experince of cinema like envirment at your home",
        "profile_picture": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/user/658f059d90236d6afad7490c/9ad7302e-d2a7-4871-8b05-2d0c3948bade.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=2490b4fc811854566082dd7ed9c5ee917867b8b3e6f97adfc5d79d70435a9e20&X-Amz-SignedHeaders=host"
      },
      "content": "",
      "media": [],
      "hashtags": [],
      "likes": 1,
      "replies": 2,
      "isRepost": true,
      "isLiked": false,
      "Repost": {
        "_id": "65bd1ec6acfc1cbe2a297eb9",
        "user": {
          "_id": "658f059d90236d6afad7490c",
          "username": "netflix",
          "fullname": "Netflix India",
          "email": "mpgohilse03@gmail.com",
          "followers": 10,
          "following": -14,
          "verified": true,
          "isFollowed": false,
          "bio": "A online OTT service giving services in India. Watch the popular shows around the world on demand. Get amazing experince of cinema like envirment at your home",
          "profile_picture": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/user/658f059d90236d6afad7490c/9ad7302e-d2a7-4871-8b05-2d0c3948bade.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=2490b4fc811854566082dd7ed9c5ee917867b8b3e6f97adfc5d79d70435a9e20&X-Amz-SignedHeaders=host"
        },
        "content": "",
        "media": [
          {
            "media_type": "image/jpeg",
            "media_url": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/posts/658f059d90236d6afad7490c/b0f2d73c-b5dc-42bb-aafd-b0bb95403b4b.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=4937e0adbe4afe26ea80994118ec90a14862a4cacca7ad3b3c6bc111a8a15271&X-Amz-SignedHeaders=host",
            "thumbnail": null,
            "_id": "65bd1ec6acfc1cbe2a297eba"
          },
          {
            "media_type": "image/jpeg",
            "media_url": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/posts/658f059d90236d6afad7490c/470258b9-c9b2-49cd-8498-b7de32555f61.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=4dc367084a505339c69caf809167a68203822e794ba8866fcfa3f943396e7433&X-Amz-SignedHeaders=host",
            "thumbnail": null,
            "_id": "65bd1ec6acfc1cbe2a297ebb"
          },
          {
            "media_type": "image/jpeg",
            "media_url": "https://thread-storage-service.s3.ap-south-1.amazonaws.com/posts/658f059d90236d6afad7490c/4cc87e76-30ea-4493-aa04-d40f68037c40.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUA2QJHDUT23ASBBD%2F20240216%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240216T153040Z&X-Amz-Expires=3600&X-Amz-Signature=74e8cb73fd66d778ab7acaca887f436bd69e899c5bfb8956d03a7b6e8c8c31f0&X-Amz-SignedHeaders=host",
            "thumbnail": null,
            "_id": "65bd1ec6acfc1cbe2a297ebc"
          }
        ],
        "hashtags": [],
        "likes": 1,
        "replies": 0,
        "isRepost": false,
        "isLiked": false,
        "created_at": "2024-02-02T16:56:38.522Z",
        "updated_at": "2024-02-13T17:25:51.130Z",
      },
      "created_at": "2024-02-02T17:14:30.099Z",
      "updated_at": "2024-02-15T18:02:54.271Z",
    },
    "content": "Comment second ",
    "created_at": "2024-02-13T17:06:51.260Z",
    "updated_at": "2024-02-13T17:06:51.260Z"
  }

describe("Replied post compoennt",()=>{
    beforeEach(()=>{
        render(
            <Provider store={store}>
  <RepliedPost
            onNavigate={()=>jest.fn()}
            onPressComment={()=>jest.fn()}
            onReplyThreeDots={()=>jest.fn()}
            onRepostIcon={()=>jest.fn()}
            toggleLike={()=>jest.fn()}
            commentPost={{
                _id:repliedPost._id,
                content: repliedPost.content,
                created_at: repliedPost.created_at,
                updated_at:repliedPost.updated_at,
                user:repliedPost.user,
                post:{
                    _id: repliedPost.post._id,
                    content: repliedPost.post.content,
                    created_at: repliedPost.post.created_at,
                    likes: repliedPost.post.likes,
                    isRepost: false,
                    hashtags:[],
                    isLiked:false,
                    media: [],
                    replies:10,
                    Repost:undefined,
                    updated_at:repliedPost.post.updated_at,
                    user: repliedPost.post.user
                }
            }}
            />
            </Provider>
          
        )
    })
})
## Threads
A full stack clone of Meta Threads. It have some mixed functionality like comment from instagram, grid images from twitter

## Requirments

- Node 
- React Native
- FFMpeg(if not it's fine it will be installed with npm)
- Xcode

## Installation

### React Native
Make sure you have Node.js and npm installed on your machine. If not, you can download and install them from [here](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone https://github.com/GohilMahendra/Thread-Rest.git
   cd Thread-Rest

2. Install libraries

    ```bash
    yarn

3. Install pods

    ```bash 
       cd ios
       pod install
    ```

### Node Server

1. install libraries
    ```bash
    yarn

2. setup ENV file

- MONGO_URL = your-db-uri
- MAILER_PASS = your-mailer-password
- MAILER_EMAIL = your-mailer-mail
- AWS_ACCESS_KEY = aws-access-key-for-storage-access
- AWS_SECRET_ACCESS_KEY = aws-secret-key-for-storage-access
- AWS_S3_BUCKET_NAME = aws-bucket-name
- AWS_REGION = aws-region-name
- TOKEN_SECRET = token-secret-for-sign-jwt

3. use this command to run on nodemoon
     ```bash
    yarn dev

### Atlas search indexes
- UserSearch (username,fullname) User Schema
   ```bash {
  "mappings": {
    "dynamic": false,
    "fields": {
      "fullname": [
        {
          "type": "stringFacet"
        },
        {
          "type": "string"
        },
        {
          "foldDiacritics": false,
          "maxGrams": 7,
          "minGrams": 3,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ],
      "username": [
        {
          "type": "stringFacet"
        },
        {
          "type": "string"
        },
        {
          "foldDiacritics": false,
          "maxGrams": 7,
          "minGrams": 2,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ]
    }
  }
}

- ContentSeach (post content full text search) Post Schema
    ```bash{
  "mappings": {
    "dynamic": false,
    "fields": {
      "content": [
        {
          "type": "stringFacet"
        },
        {
          "type": "string"
        },
        {
          "foldDiacritics": false,
          "maxGrams": 7,
          "minGrams": 2,
          "tokenization": "edgeGram",
          "type": "autocomplete"
        }
      ]
    }
  }
}
## Tech Stack

### fronend
- React-Native 
- Typescript
- Redux-Toolkit
- React-navigation v6
- reanimated v2
- Socket.io client

### backend
- MongoDB
- Node.js
- Express.js
- Aws s3
- JWT statless
- Typescript
- Socket.io

## Features

### Auth
- Otp Email verification
- JWT token used for statless authentication
- Password is hashed using bcypt

### Posts
- create a post (post can be simple text , photo or a video same as twitter)
- delete Post (only owner action)
- like a post
- comment on post
- repost the other posts (same as twitter retweet without or with qoute)

### Favorites
- section dadicated to user activities
- user can see all posts which liked by him
- user can see all posts on which he commented along with the comment
- user can get all list of followings, he can unfollow if want to directly from list

### Pagination
- all lists in app have pagination applied.
- cursor pagination is implemented as mongodb is nosql database
- cursor pagination runs fine in times of previous posts deletion before loading or new additions (removes case of duplicate posts)
- post id as offset is used along with created time for sort posts

### Followers
- follow user
- unfollow user
- get following posts
- get list of follwings
- get into the user profile by pressing on user

### Replies
- comment on post, inspired by instragram comment section (diffrent from traditional)
- get posts in which you replies
- for the replied posts you can again do like,repost and comment

### Messaging 
- send message to user in real time
- message can be text or media (audio/video)
- real time unread-counts, new convesations added
- can check typing status and message of sender before it actually sends it

## Screenshots

### Dark Mode

| Settings Dark Mode| Settings logout | Sign In |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode//Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.09.14.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.09.17.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.09.21.png) |

| Sign Up| Delete Thread | User Profile |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.09.23.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.10.14.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.10.35.png) |

| Following | Comment 1 | Comment 2 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode//Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.10.44.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.11.17.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.11.21.png) |

| Comment 3 | Favorites -Reply | Favorites -Reply Delete |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.11.55.png) | ![Screenshot 2](screenshots/dark%20mode//Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.13.11.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.22.53.png) |

| Favorites -liked | Follwing | Favorites -follwings |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.23.06.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.23.31.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.23.40.png) |

| Full Text search 1 | Full Text search 2 | Full Text search 3 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.12.37.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.18.52.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.12.49.png) |

| Profile 01 | Profile 02 | Create Thread |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.23.45.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.25.01.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.26.32.png) |

| Profile Posts | User Profile Posts | Video Player |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.26.36.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.27.20.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.27.47.png) |

| Real-Time Chat 1 | Real-Time Chat 2 | Real-Time Chat 3 |
| ---------------- | ---------------- | ---------------- |
| ![Screenshot 1](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-16%20at%2002.06.43.png) | ![Screenshot 2](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-16%20at%2002.06.52.png) | ![Screenshot 3](screenshots/dark%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-16%20at%2002.07.35.png) |


### Light Mode
| Sign In| Sign Up | Feed1 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.45.02.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.45.09.png) | ![Screenshot 3](screenshots/light%20mode//Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.46.39.png) |

| Feed2 | Feee3 | Feed4 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.46.43.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.47.09.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.47.21.png) |

| Repost | User Posts | Comments |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.51.36.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.52.08.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.55.40.png) |

| Add Comment | Feed5 | UserProfile |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.56.42.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.57.35.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.57.49.png) |

| Qoute Post | Qoute Post 2 | Search |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.58.48.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.58.48.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.59.22.png) |

| Full Text search 1 | Full Text search 2 | Full Text search 3 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.13.04.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.18.59.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20-%202024-01-02%20at%2002.13.10.png) |

| Create Threads | User Profile | Edit Profile |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2005.59.55.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.00.09.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.01.04.png) |

| User Profile | User Profile 2 |  Favorites |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.01.11.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.05.58.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%20SE%20(3rd%20generation)%20-%202024-01-01%20at%2000.57.44.png) |

| Favorites 2 | Favorites 3 | Favorites 4 |
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.07.01.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.07.06.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.07.12.png) |

| Profile | Settings ||
| ------------ | ------------ | ------------ |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.08.48.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20Pro%20Max%20-%202023-12-31%20at%2006.09.11.png) ||

| Real-Time Chat 1 | Real-Time Chat 2 | Real-Time Chat 3 |
| ---------------- | ---------------- | ---------------- |
| ![Screenshot 1](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-15%20at%2022.42.03.png) | ![Screenshot 2](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-16%20at%2002.06.28.png) | ![Screenshot 3](screenshots/light%20mode/Simulator%20Screenshot%20-%20iPhone%2015%20-%202024-02-16%20at%2002.08.04.png) |




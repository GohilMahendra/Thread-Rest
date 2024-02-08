import { PopulatedDoc } from "mongoose";
import { Media, PostDocument } from "./Post";
import { UserDocument } from "./User";


export interface ChannelDocument extends Document {
    _id: string,
    memebers: PopulatedDoc<UserDocument[]>,
    lastMessage: PopulatedDoc<MessageDocument>
}

export interface MessageDocument extends Document {
    post?: PopulatedDoc<PostDocument>
    sender: PopulatedDoc<UserDocument>
    channel: PopulatedDoc<ChannelDocument>
    media: Media[];
    content?: string;
    createdAt: Date;
    updatedAt: Date;
}
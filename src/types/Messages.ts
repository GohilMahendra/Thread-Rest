import { Media } from "./Post";
import { User } from "./User";

export interface Channel
{
    _id: string;
    member: User;
    created_at: string;
    updated_at: string;
    lastMessage?: Message,
    unread_messages: number
}

export interface Message
{
    _id: string;
    content?: string;
    media?: Media[];
    sender: string,
    channel: string,
    created_at: string;
    updated_at: string;
}

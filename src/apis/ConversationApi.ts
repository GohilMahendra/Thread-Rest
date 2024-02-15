import axios from "axios"
import { BASE_URL } from "../globals/constants"
import { getToken } from "../globals/utilities"

export const getUnreadCount = async () => {
    try {
        const token = await getToken()
        const response = await axios.get(`${BASE_URL}messages/unread_count`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            }
        )

        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }

    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}

export const getConversations = async () => {
    try {
        const token = await getToken()
        const response = await axios.get(`${BASE_URL}messages`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            }
        )

        if (response.status == 200) {
            return response.data
        }
        else {
            throw new Error(response.data)
        }

    }
    catch (error: any) {
        if (error.response) {
            throw new Error(error.response.status + error.response.data.message);
        } else if (error.request) {
            throw new Error("No Response from Server");
        } else {
            throw new Error("Error:" + error.message);
        }
    }
}
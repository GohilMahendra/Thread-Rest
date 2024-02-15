import axios from "axios";
import { BASE_URL } from "../globals/constants";
import { getToken } from "../globals/utilities";

export const fetchMessages = async ({
    pageSize = 10,
    lastOffset,
    receiverId,
}: { pageSize: number, lastOffset?: string, receiverId: string }) => {
    try {
        const token = await getToken()

        let query = `${BASE_URL}messages/${receiverId}?pageSize=${pageSize}`;

        if (lastOffset) {
            query += `&lastOffset=${lastOffset}`;
        }

        const response = await axios.get(query, {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })
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

import { Timestamp } from "firebase/firestore";

interface Message {
    createdAt: Timestamp,
    message: string,
    userName: string,
    userId: string,
}

export default Message;
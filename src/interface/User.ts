import { Timestamp } from "firebase/firestore";
import { Notifications } from '@/interface/Notifications';

interface User {
    displayName: string,
    email: string,
    lastSignin: Timestamp,
    photoURL: string | null,
    filePath?: string,
    notifications: Notifications[],
    uid: string
}

export default User;
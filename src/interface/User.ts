import { Timestamp } from "firebase/firestore";
import Event from '@/interface/Event';
import { Notifications } from '@/interface/Notifications';

interface User {
    displayName: string,
    email: string,
    lastSignin: Timestamp,
    events: Event[],
    notifications: Notifications[],
    uid: string
}

export default User;
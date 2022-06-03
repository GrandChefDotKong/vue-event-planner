import { Timestamp } from "firebase/firestore";
import Event from '@/interface/Event';

interface User {
    displayName: string,
    email: string,
    lastSignin: Timestamp,
    events: Event[],
    notifications: string[],
    id: string
}

export default User;
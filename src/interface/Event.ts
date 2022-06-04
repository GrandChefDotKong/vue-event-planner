import { DocumentReference, Timestamp } from "firebase/firestore";

interface Event {
    id: string,
    title: string,
    description: string,
    location: string,
    dates: Timestamp,
    creatorId: string,
    creatorName: string,
    participants: DocumentReference[],
}

export default Event;
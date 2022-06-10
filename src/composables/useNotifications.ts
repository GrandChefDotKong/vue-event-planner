import { ref } from "vue";
import { doc, collection, getDocs, updateDoc, getDoc, DocumentReference } from "firebase/firestore";
import { projectStore } from '../firebase/config';
import { Notifications } from "@/interface/Notifications";

const useNotifications = () => {

  const error = ref<string | null>(null);
  const isPending = ref(false);

  const activateNotification = () => {
    
  }

  const sendNotification = () => {
    if(Notification.permission.toString() === 'granted') {
      new Notification('Hello World', { body: 'Hello Notifications', icon: '' })
    }
  }

  const sendToAll = async (notification: Notifications) => {
    error.value = null;
    isPending.value = true;

    try {
      const querySnapshot = await getDocs(collection(projectStore, 'users'));
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          notifications: [...doc.data().notifications, notification]
        });
      })

    } catch (err: any) {
      console.log(err.message);
      error.value = "Couldn't add to the collection";
      isPending.value = false;
    }
  }

  const sendToParticipants = async (notification: Notifications, docsRef: DocumentReference[]) => {
    docsRef.forEach(async(docRef) => {
      
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) return;

      await updateDoc(doc(projectStore, 'users', docSnap.id), {
        notifications: [...docSnap.data().notifications, notification]
      })
    })
  }
    
  return { sendToAll, sendToParticipants, activateNotification, sendNotification, error };
}

export default useNotifications;



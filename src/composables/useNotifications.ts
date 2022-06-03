import { ref } from "vue";
import { doc, collection, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { projectStore } from '../firebase/config';

const useNotifications = () => {

  const error = ref<string | null>(null);
  const isPending = ref(false);

  const sendToAll = async (notification: string) => {
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

  const sendToParticipants = async (notification: string, listId: string[]) => {
    listId.forEach(async(id) => {
      
      const docSnap = await getDoc(doc(projectStore, 'users', id))

      if(!docSnap.exists()) return;

      updateDoc(doc(projectStore, 'users', id), {
        notifications: [...docSnap.data().notifications, notification]
      })
    })
  }
    
  return { sendToAll, sendToParticipants , error };
}

export default useNotifications;



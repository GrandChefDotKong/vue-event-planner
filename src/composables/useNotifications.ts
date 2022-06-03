import { ref } from "vue";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { projectStore } from '../firebase/config';
import Event from "@/interface/Event";

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
    
  return { sendToAll, error };
}

export default useNotifications;



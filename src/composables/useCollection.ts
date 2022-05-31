import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { projectStore } from '../firebase/config';
import Event from "@/interface/Event";

const useCollection = (collectionName: string) => {

    const error = ref<string | null>(null);
    const isPending = ref(false);

    const addToCollection = async (docData: Event) => {
      error.value = null;
      isPending.value = true;
      try {
        const res = await addDoc(collection(projectStore, collectionName), docData);

        isPending.value = false;
        console.log(res.id);

        return res;

      } catch (err: any) {
        console.log(err.message);
        error.value = "Couldn't add to the collection";
        isPending.value = false;
      }
    }

    return { addToCollection, error, isPending };
}

export default useCollection;
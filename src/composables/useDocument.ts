import { projectStore } from '../firebase/config';
import { ref } from 'vue';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Event from '@/interface/Event';


const useDocument = (collectionName: string, id: string) => {
    const error = ref<string | null>(null);
    const isPending = ref(false);

    let docRef = doc(collection(projectStore, collectionName), id);


    const updateDocument = async (updatedDocument: any) => {
        isPending.value = true;
        error.value = null;

        try {
          const res = await updateDoc(docRef, updatedDocument);
            
        } catch (err: any) {
          console.log(err.message);
          error.value = "Could not add the song :/";
        }
    }

    const deleteDocument = async () => {
        isPending.value = true;
        error.value = null;

        try {
            const res = await deleteDoc(docRef);
            isPending.value = false;

            return res;
            
        } catch (err: any) {
            error.value = 'Could not delete the document';
            console.log(err.message);
            isPending.value = false;
        }
    }

    return { error, isPending, deleteDocument, updateDocument }
}

export default useDocument;
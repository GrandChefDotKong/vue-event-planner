import { ref, watchEffect } from 'vue';
import { projectStore } from '../firebase/config';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import Event from '@/interface/Event';

const getDocument = (collectionName: string, id: string) => {

    const document = ref<any>(null);
    const error = ref<string | null>(null);

    const docRef = doc(collection(projectStore, collectionName), id); 

    const unsub = onSnapshot(docRef,
      (snap) => {

        if(!snap.data()) {
            error.value = 'That document does not exist :/';
            return;
        }

        document.value = { ...snap.data(), id: snap.id };
        error.value = null;

      }, (err) => {
        console.log(err.message);
        error.value = 'Coul not fetch data from the server :/';
        document.value = null;
    });

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

  return { document, error };
}

export default getDocument;
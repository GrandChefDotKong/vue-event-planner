import { ref, watchEffect } from 'vue';
import { projectStore } from '../firebase/config';
import { doc, collection, onSnapshot, DocumentReference, getDoc } from 'firebase/firestore';

export const getDocument = (collectionName: string, id: string) => {

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

export const getSnapDocument = async (collectionName: string, id: string) => {

  const document = ref<any>(null);
  const docRef = doc(collection(projectStore, collectionName), id); 

  try {
    
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      document.value = { ...docSnap.data(), id: docSnap.id};
    }
    
  } catch (err: any) {
    console.log(err.message);
    document.value = null;
  }

  return { document };
}

type GetExist = (collectionName: string, id: string) => Promise<boolean>
export const isDocumentExist: GetExist = async (collectionName, id) => {

  const docRef = doc(collection(projectStore, collectionName), id); 

  try {
    
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      return true;
    }

    return false;
    
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}

export const getDocumentWithRef = async (docRef: DocumentReference) => {

  const document = ref<any>(null);
  const error = ref<string | null>(null);

  try {
    
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      document.value = { ...docSnap.data(), id: docSnap.id};
      error.value = null;
    }
    
  } catch (err: any) {
    console.log(err.message);
    error.value = 'Coul not fetch data from the server :/';
    document.value = null;
  }

  return { document, error };
}

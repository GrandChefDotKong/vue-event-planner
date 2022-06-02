import { ref, watchEffect } from 'vue';
import { projectStore } from '../firebase/config';
import { query, collection, orderBy, onSnapshot, where, WhereFilterOp } from 'firebase/firestore';
import Event from '@/interface/Event';

const getCollection = (collectionName: string, request?: string[]) => {

    const docs = ref<any[]>([]);
    const error = ref<string | null>(null);
    const collectionRef = collection(projectStore, collectionName); 
    
    let q;

    if(request?.length === 3) {
      q = query(collectionRef, where(request[0], request[1] as WhereFilterOp, request[2]));
    } else {
      q = query(collectionRef);
    }

    const unsub = onSnapshot(q,
      (snap) => {
        let results: any[] = [];
        snap.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as Object);
        });
        
        docs.value = results;
        error.value = null;

      }, (err) => {
        console.log(err.message);
        error.value = 'Coul not fetch data from the server :/';
        docs.value = [];
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub())
    })

  return { docs, error };
}

export default getCollection;


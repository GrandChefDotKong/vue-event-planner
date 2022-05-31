import { ref, watchEffect } from 'vue';
import { projectStore } from '../firebase/config';
import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore';
import Event from '@/interface/Event';

const getCollection = (collectionName: string/*, request: { a:string, b:string, c:string } | null*/) => {

    const docs = ref<Event[]>([]);
    const error = ref<string | null>(null);
    const collectionRef = collection(projectStore, collectionName); 
    
    let q;

    if(false) {
      q = query(collectionRef, orderBy('createdAt'), /*where(...request)*/);
    } else {
      q = query(collectionRef);
    }

    const unsub = onSnapshot(q,
      (snap) => {
        let results: Event[] = [];
        snap.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as Event);
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


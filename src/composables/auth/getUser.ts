import { ref, watchEffect } from "vue";
import { projectAuth, projectStore } from "@/firebase/config";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import User from '@/interface/User';

const user = ref<User | null>(null);
const error = ref<string | null>(null);

onAuthStateChanged(projectAuth, (_user) => {
  if(_user) {
    setUser(_user.uid);
  }
});

const setUser = async(id: string) => {

  const userRef = doc(projectStore, 'users', id);
  //const userSnap = await getDoc(userRef);

  const unsub = onSnapshot(userRef,
    (snap) => {
      if(!snap.data()) {
        error.value = 'That document does not exist :/';
        return;
      }

      user.value = { ...snap.data(), uid: snap.id } as User;
      
      error.value = null;

    }, (err) => {
      console.log(err.message);
      error.value = 'Coul not fetch data from the server :/';
      user.value = null;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })
}

if(projectAuth.currentUser) {
  setUser(projectAuth.currentUser.uid);
}

const getUser = () => {
  return { user }
}

export default getUser;
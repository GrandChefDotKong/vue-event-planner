import { ref } from "vue";
import { projectAuth, projectStore } from "@/firebase/config";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import User from '@/interface/User';

const user = ref<User | null>(null);

onAuthStateChanged(projectAuth, (_user) => {
  if(_user) {
    setUser(_user.uid);
  }
});

const setUser = async(id: string) => {
  const userRef = doc(projectStore, 'users', id);
  const userSnap = await getDoc(userRef);

  user.value = { ...userSnap.data(), uid: id } as User;
}

if(projectAuth.currentUser) {
  setUser(projectAuth.currentUser.uid)
}

const getUser = () => {
  return { user }
}

export default getUser;
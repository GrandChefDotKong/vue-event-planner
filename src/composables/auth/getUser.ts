import { ref } from "vue";
import { projectAuth } from "@/firebase/config";
import { onAuthStateChanged, User } from 'firebase/auth';

const user = ref<User | null>(projectAuth.currentUser ? projectAuth.currentUser : null);

onAuthStateChanged(projectAuth, (_user) => {
  if(_user) {
    user.value = _user;
  }
});

const getUser = () => {
  return { user }
}

export default getUser;
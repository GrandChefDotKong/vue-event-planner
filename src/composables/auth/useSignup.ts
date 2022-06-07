import { ref } from "vue";
import { projectAuth, timestamp } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useCollection from "../useCollection";

  const error = ref<string | null>(null);
  const isPending = ref(false);

  const signup = async (email: string, password: string, displayName: string) => {
    error.value = null;
    isPending.value = true;

    try {
        
      const res = await createUserWithEmailAndPassword(projectAuth, email, password);

      if(!res) throw new Error('Couldn\'t complete the sign up :,(');

      const { addToCollection } = useCollection('users');

      await addToCollection({
        email: res.user.email,
        displayName: displayName,
        events: [],
        notifications: [],
        lastSignin: timestamp.now()
      }, res.user.uid)

      //await updateProfile(res.user, { displayName });
      
      error.value = null;
      isPending.value = false;

      return res;

    } catch (err: any) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }  
  }

  const useSignup = () => {
    return { error, signup, isPending }
  }

export default useSignup;
import { ref } from "vue";
import { projectAuth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'

  const error = ref<string | null>(null);
  const isPending = ref(false);

  const signin = async (email: string, password: string) => {
    error.value = null;
    isPending.value = true;

    try {

      const res = await signInWithEmailAndPassword(projectAuth, email, password);    
      error.value = null;
      isPending.value = false;

      return res;

    } catch (err: any) {
      console.log(err.message);
      error.value = 'Incorrect login credentials';
      isPending.value = false;
    }  
  }

  const useSignin = () => {
    return { error, signin, isPending }
  }

export default useSignin;
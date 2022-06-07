import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { projectAuth, timestamp } from "@/firebase/config";
import useCollection from "../useCollection";
import { ref } from "vue";

  const error = ref<string | null>(null);

  const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    
    await signInWithPopup(projectAuth, provider).then((result) => {
    //  const credential = GoogleAuthProvider.credentialFromResult(result);
      error.value = null;
      return error.value;
      
    }).catch((error) => {
      error.value = `${error.code} : ${error.message}`;
    //  const credential = GoogleAuthProvider.credentialFromError(error);
      return error.value;
    });
  }

  const signUpWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    const { addToCollection } = useCollection('users');
    
    await signInWithPopup(projectAuth, provider).then(async(result) => {
    //  const credential = GoogleAuthProvider.credentialFromResult(result);

      await addToCollection({
        email: result.user.email,
        displayName: result.user.displayName,
        events: [],
        notifications: [],
        lastSignin: timestamp.now()
      }, result.user.uid)


      error.value = null;
      return error.value;
      
    }).catch((error) => {
      error.value = `${error.code} : ${error.message}`;
    //  const credential = GoogleAuthProvider.credentialFromError(error);
      return error.value;
    });
  }

  const useSignWithGoogle = () => {
    return { error, signInWithGoogle, signUpWithGoogle }
  }

export default useSignWithGoogle;



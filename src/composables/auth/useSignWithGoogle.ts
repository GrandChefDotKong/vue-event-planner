import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { projectAuth, timestamp } from "@/firebase/config";
import useCollection from "../useCollection";
import { isDocumentExist } from "../getDocument";
import { ref } from "vue";


  const error = ref<string | null>(null);

  const signWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    const { addToCollection } = useCollection('users');
    
    await signInWithPopup(projectAuth, provider).then(async(result) => {
    //  const credential = GoogleAuthProvider.credentialFromResult(result);

      if(!isDocumentExist('users', result.user.uid)) {
        await addToCollection({
          email: result.user.email,
          displayName: result.user.displayName,
          events: [],
          notifications: [],
          lastSignin: timestamp.now()
        }, result.user.uid)
      }

      error.value = null;
      return error.value;
      
    }).catch((error) => {
      error.value = `${error.code} : ${error.message}`;
    //  const credential = GoogleAuthProvider.credentialFromError(error);
      return error.value;
    });
  }

  const useSignWithGoogle = () => {
    return { error, signWithGoogle }
  }

export default useSignWithGoogle;



import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { projectAuth, timestamp } from "@/firebase/config";
import useCollection from "../useCollection";
import { isDocumentExist } from "../getDocument";
import { ref } from "vue";
import useNotifications from "../useNotifications";
import { NotificationsType } from '@/interface/Notifications';
import User from "@/interface/User";

import useDocument from "../useDocument";


  const error = ref<string | null>(null);

  const signWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    const { addToCollection } = useCollection('users');
    const { sendToAll } = useNotifications();
    
    await signInWithPopup(projectAuth, provider).then(async(result) => {
    //  const credential = GoogleAuthProvider.credentialFromResult(result);

    const isUserExist = await isDocumentExist('users', result.user.uid);

    if(!isUserExist) {
      
      await addToCollection({
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        notifications: [],
        lastSignin: timestamp.now()
      } , result.user.uid);

      sendToAll({
        type: NotificationsType.user_create,
        content: `${result.user.displayName} has join the group`,
      });

    }

    if(!result.user.photoURL) {
      const { updateDocument } = useDocument('users', result.user.uid);
      await updateDocument({ photoURL: result.user.photoURL })
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



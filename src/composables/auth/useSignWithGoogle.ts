import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { projectAuth, timestamp } from "@/firebase/config";
import useCollection from "../useCollection";
import { isDocumentExist } from "../getDocument";
import { ref } from "vue";
import useNotifications from "../useNotifications";
import { NotificationsType } from '@/interface/Notifications';


  const error = ref<string | null>(null);

  const signWithGoogle = async () => {

    const provider = new GoogleAuthProvider();
    const { addToCollection } = useCollection('users');
    const { sendToAll } = useNotifications();
    
    await signInWithPopup(projectAuth, provider).then(async(result) => {
    //  const credential = GoogleAuthProvider.credentialFromResult(result);

      if(!isDocumentExist('users', result.user.uid)) {
        await addToCollection({
          email: result.user.email,
          displayName: result.user.displayName,
          events: [],
          notifications: [],
          lastSignin: timestamp.now()
        }, result.user.uid);

        sendToAll({
          type: NotificationsType.user_create,
          content: `${result.user.displayName} has join the group`,
        });

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



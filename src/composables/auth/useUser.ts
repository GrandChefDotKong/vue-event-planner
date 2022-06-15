import { ref } from "vue";
import { projectAuth, projectStore } from '@/firebase/config';
import { updateProfile, signInWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth';
import { collection, doc, updateDoc } from "firebase/firestore";

  const error = ref<string | null>(null);
  const isPending = ref(false);

  const getProviderId = () => {
    if(!projectAuth.currentUser) return null;

    return projectAuth.currentUser.providerData[0].providerId;    
  }

  const updateUser = async (email: string, password: string, displayName: string) => {
    
    if(!projectAuth.currentUser) return;

    error.value = null;
    isPending.value = true;

    const docRef = doc(collection(projectStore, 'users'), projectAuth.currentUser.uid);

    try {

//    await updateProfile(projectAuth.currentUser, { displayName });

      await updateDoc(docRef, { displayName });

/*    
      await signInWithEmailAndPassword(projectAuth, email, password).then(async(userCredential) => {
        
        if(displayName != '') {
          await updateProfile(userCredential.user, { displayName });
        }

        if(email != '') {
          await updateEmail(userCredential.user, email);
        }
        if(displayName != '') {
          await updatePassword(userCredential.user, password);
        }
      })
*/
    } catch (err: any) {
      console.log(err.message);
      error.value = 'Incorrect login credentials';
      isPending.value = false;
    }  
  }

  const useUser = () => {
    return { error, updateUser, getProviderId, isPending }
  }

export default useUser;
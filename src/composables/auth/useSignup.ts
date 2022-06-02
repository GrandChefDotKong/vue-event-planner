import { ref } from "vue";
import { projectAuth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const error = ref<string | null>(null);
const isPending = ref(false);

const signup = async (email: string, password: string, displayName: string) => {
    error.value = null;
    isPending.value = true;

    try {
        
        const res = await createUserWithEmailAndPassword(projectAuth, email, password);

        if(!res) {
            throw new Error('Couldn\'t complete the sign up :,(')
        }

        await updateProfile(res.user, { displayName });
        
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
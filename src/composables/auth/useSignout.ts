import { ref } from "vue";
import { projectAuth } from '@/firebase/config';
import { signOut } from 'firebase/auth'

const error = ref<string | null>(null);
const isPending = ref(false);

const signout = async () => {
    error.value = null;
    isPending.value = true;

    await signOut(projectAuth).then(() => {
        error.value = null;
        isPending.value = false;
    }).catch((err) => {
        console.log(err.message);
        error.value = 'Couldn\'t log out. Try again';
        isPending.value = false;
    });
}

const useSignout = () => {

    return { error, signout, isPending }
}

export default useSignout;
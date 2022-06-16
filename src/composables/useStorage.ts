import { projectStorage } from "@/firebase/config";
import { ref } from 'vue';
import { ref as storageReference, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

  const useStorage = () => {
    const error = ref<string | null>(null);
    const url = ref<string | null>(null);
    const filePath = ref<string | null>(null);

    const uploadImage = async (file: any, id: string) => {

      filePath.value = `profile-picture/${id}/${file.name}`;

      const storageRef = storageReference(projectStorage, filePath.value);

      await uploadBytes(storageRef, file)
      .then(async(res) => {
        await getDownloadURL(res.ref).then(downloadURL => url.value = downloadURL);
      }).catch((err) => {
        console.log(err.message);
        error.value = err.message;
      });
    }
    

    const deleteImage = async (path: string) => {

        const storageRef = storageReference(projectStorage, path);

        await deleteObject(storageRef)
        .then(() => {
        }).catch((err) => {
            console.log(err.message);
            error.value = err.message;
        })
    }

    return { url, filePath, error, uploadImage, deleteImage }
  }

export default useStorage;
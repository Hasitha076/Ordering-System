import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";


export const submitValidation = async (values) => {
    console.log(values);
    const image = values.image

    let imageUrl = ""; // Variable to hold the image URL

    if (image) {
        try {
            // Create a storage reference
            const storageRef = ref(
                storage,
                `images/${Math.random()}-${image.name}`
            )

            // Upload the file and wait for the upload to complete
            const snapshot = await uploadBytes(storageRef, image);

            // Get the download URL and wait for it
            imageUrl = await getDownloadURL(snapshot.ref);
            console.log("Image URL:", imageUrl);

            return values, imageUrl
        } catch (error) {
            // Handle any errors in the upload or URL retrieval process
            console.error("Error in image upload or URL retrieval", error);
            return; // Exit the function if there's an error
        }
    } else {
        console.error("No image to upload.");
        return; // Exit the function if there's no image
    }
    // setTimeout(() => {
    //     console.log(values);
    //     alert(JSON.stringify(values, null, 2))
    //     setSubmitting(false)
    // }, 400)
}
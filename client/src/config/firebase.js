
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIsVhZnYeWxRHsdha_fek0KunXNFP1Tec",
    authDomain: "order-management-system-766af.firebaseapp.com",
    projectId: "order-management-system-766af",
    storageBucket: "order-management-system-766af.appspot.com",
    messagingSenderId: "958793517870",
    appId: "1:958793517870:web:0bb1ad5a5cccaa9fbb88bf",
    measurementId: "G-KNRW7BD783"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };

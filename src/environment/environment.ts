import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyA85aCndQMSRkKPDhbT8fF_2LErA6j0Itw",
        authDomain: "mytechnicaltest-7481c.firebaseapp.com",
        projectId: "mytechnicaltest-7481c",
        storageBucket: "mytechnicaltest-7481c.appspot.com",
        messagingSenderId: "1041967713174",
        appId: "1:1041967713174:web:3d357949a98874d6b7ebb7",
        measurementId: "G-7Y4EN79665"
    }
}

const app = initializeApp(environment.firebaseConfig);
const DB = getFirestore(app)

export default DB
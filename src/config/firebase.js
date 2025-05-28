import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTMxKG9qDo-vpws-UNuolpj7c4L4aCwVY",
  authDomain: "smartgardens-747f5.firebaseapp.com",
  projectId: "smartgardens-747f5",          // Essencial para funcionar!
  storageBucket: "smartgardens-747f5.appspot.com",
  messagingSenderId: "192845234282",
  appId: "1:192845234282:web:749fd5e22e65c4dbfcca13",
};

const app = initializeApp(firebaseConfig);

// Inicializa o auth assim, dentro de um try/catch para pegar erros de runtime
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  console.warn("Erro ao inicializar Auth:", error);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

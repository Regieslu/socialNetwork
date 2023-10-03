// aqui exportaras las funciones que necesites
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase.js';

/* getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect,
getRedirectResult,signInWithEmailAndPassword, */

// Funcion para crear nuevos usurios, recibe email y contraseña
const signUpUser = async (email, password) => {
  try {
    // Invocamos al servicio de firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    localStorage.setItem('user', userCredential.user);

    return userCredential;
  } catch (error) {
    // Manejo de errores
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already in use');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please  try again');
    } else if (error.code === 'auth/weak-password') {
      alert('Your password is too short, please try again');
    } else if (error.code) {
      alert('Something went wrong, please try again');
    }
    return undefined;
  }
};
const loginUser = async (email, password) => {
  try {
    // Invocamos el servicio de firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    localStorage.setItem('user', userCredential.user);
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Your password is wrong, please try again');
    } else if (error.code === 'auth/user-not-found') {
      alert('You are not signed up yet'); // Añadir botón de registro como mejora
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please try again');
    } else if (error.code) {
      alert('Something went wrong, please try again');
    }
    return undefined;
  }
};

const loginWithGoogle = async () => {
  try {
    // Inicializamos googleAuth
    const provider = new GoogleAuthProvider();
    // Invocamos el modal de iniciar sesion con google
    const userCredential = await signInWithPopup(auth, provider);
    localStorage.setItem('user', userCredential);
    return userCredential;
  } catch (error) {
    return undefined;
  }
};
const validateUserSession = () => {
  //   // Detecta el estado de autentificación
  //   // Este observador de firebase nos sirve para validar si el usuario ya habia iniciado sesion
  //   // o ya se habia registrado, en este caso navegamos a feed.
  onAuthStateChanged(auth, (user) => user);
};

const resetPasswordUser = async (email) => {
  try {
    // Invocamos al metodo resetPasswordResetEmail, el cual envia un link
    // al correo del usuario para resetear su contraseña
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    return undefined;
  }
};
const signOutUser = async () => {
  // función para cierre de sesión, no testeada aún
  try {
    // función para cierre de sesión, no testeada aún
    await signOut(auth);
    return localStorage.removeItem('user');
  } catch (error) {
    return alert('Something wrong happened, please try again.');
  }
  // termina función de cierre de sesión
};
// Funcion para actualizar el usuario
const updateCurrentUser = async (completeUserName) => {
  await updateProfile(auth.currentUser, { displayName: completeUserName });
};
/* function registrarConEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
} */

/* const updateOutput = (outputElement, message) => {
  if (outputElement) {
    outputElement.textContent = message;
  }
}; */

// funcion que comparito el coach
// Importa Firebase y configura la inicialización
// const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_DOMINIO.firebaseapp.com",
//   databaseURL: "https://TU_DOMINIO.firebaseio.com",
//   projectId: "TU_PROYECTO_ID",
//   storageBucket: "TU_BUCKET.appspot.com",
//   messagingSenderId: "TU_MENSAJERÍA_SENDER_ID",
//   appId: "TU_APP_ID"
// };
// firebase.initializeApp(firebaseConfig);

// // Autenticación del usuario (puedes usar diferentes métodos aquí)
// const user = firebase.auth().currentUser;

// // Actualizar el nombre del usuario
// if (user) {
//   user.updateProfile({
//     displayName: "NuevoNombre"
//   })
//   .then(function() {
//     // Actualización exitosa
//     console.log("Nombre de usuario actualizado con éxito");
//   })
//   .catch(function(error) {
//     // Error en la actualización
//     console.error("Error al actualizar el nombre de usuario:", error);
//   });
// }
export {
  signUpUser,
  loginUser,
  loginWithGoogle,
  signOutUser,
  validateUserSession,
  resetPasswordUser,
  updateCurrentUser,
};

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

// Funcion para actualizar el usuario
const updateCurrentUser = async (completeUserName) => {
  await updateProfile(auth.currentUser, { displayName: completeUserName });
};

// Funcion para crear nuevos usurios, recibe email y contraseña
const signUpUser = async (email, password) => { // aqui va username
  try {
    // Invocamos al servicio de firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    updateCurrentUser(email); // aqui pasamos username
    localStorage.setItem('user', JSON.stringify(userCredential.user));

    return userCredential;
  } catch (error) {
    // Manejo de errores
    if (error.code === 'auth/email-already-in-use') {
      return ('This email is already in use');
    } if (error.code === 'auth/invalid-email') {
      return ('Invalid email, please  try again');
    } if (error.code === 'auth/weak-password') {
      return ('Your password is too short, please try again');
    } if (error.code) {
      return ('Something went wrong, please try again');
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
    localStorage.setItem('user', JSON.stringify(userCredential.user));
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Your password is wrong, please try again');// eslint-disable-line no-alert
    } else if (error.code === 'auth/user-not-found') {
      alert('You are not signed up yet');// eslint-disable-line no-alert
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please try again'); // eslint-disable-line no-alert
    } else if (error.code) {
      alert('Something went wrong, please try again'); // eslint-disable-line no-alert
    }
    return undefined;
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(auth, provider);
    localStorage.setItem('user', JSON.stringify(userCredential));
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      alert('Your password is wrong, please try again');// eslint-disable-line no-alert
    } else if (error.code === 'auth/user-not-found') {
      alert('You are not signed up yet');// eslint-disable-line no-alert
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email, please try again'); // eslint-disable-line no-alert
    } else if (error.code) {
      alert('Something went wrong, please try again'); // eslint-disable-line no-alert
    }
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
    return alert('Something wrong happened, please try again.'); // eslint-disable-line no-alert
  }
  // termina función de cierre de sesión
};

export {
  signUpUser,
  loginUser,
  loginWithGoogle,
  signOutUser,
  validateUserSession,
  resetPasswordUser,
  updateCurrentUser,
};

import {signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut} from "firebase/auth";
import {auth} from "/src/config/firebaseConfig";

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return Promise.reject(error);
        });
}

export const logout = () => {
    // sign out
    signOut(auth);
}

export const getCurrentUser = () => {
    return auth.currentUser;
}
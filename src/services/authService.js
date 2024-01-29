import {getAuth, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, onAuthStateChanged,
    signOut} from "firebase/auth";

const auth = getAuth();

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
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export const logout = () => {
    // sign out
    signOut(auth);
}

export const getCurrentUser = () => {
    return auth.currentUser;
}
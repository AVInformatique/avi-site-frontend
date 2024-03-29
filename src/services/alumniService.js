import { doc, collection, query, orderBy, where, 
        getDocs, getDoc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function getAlumnis() {
    const alumniRef = collection(db, 'alumnis');
    const q = query(alumniRef, orderBy('name'));
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then(querySnapshot => {
                const alumnis = [];
                querySnapshot.forEach(doc => {
                    const alumni = {
                        id: doc.id,
                        ...doc.data()
                    };
                    alumnis.push(alumni);
                });
                resolve(alumnis);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getAlumnisByPromotion(promo) {
    const alumniRef = collection(db, 'alumnis');
    const q = query(alumniRef, where('promotion', '==', promo), orderBy('name'));
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then(querySnapshot => {
                const alumnis = [];
                querySnapshot.forEach(doc => {
                    const alumni = {
                        id: doc.id,
                        ...doc.data()
                    };
                    alumnis.push(alumni);
                });
                resolve(alumnis);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addAlumni(user, alumni) {
    // Validation: user is required
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: user is required');
        });
    }

    // Validation: name is required
    if (!alumni.name) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: name is required');
        });
    }
    // Validation: promotion must be a number
    if (alumni.promotion && isNaN(alumni.promotion)) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: promotion must be a number');
        });
    }

    return new Promise((resolve, reject) => {
        addDoc(collection(db, 'alumnis'), alumni)
            .then((docRef) => {
                resolve(docRef.id);
                console.log('Document successfully added!');
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getAlumniById(id) {
    const alumniRef = doc(db, 'alumnis', id); // Update this line
    return new Promise((resolve, reject) => {
        getDoc(alumniRef) // Update this line
            .then((doc) => {
                resolve(doc.data());
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function updateAlumniById(user, id, alumni) {
    // Validation: user is required
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: user is required');
        });
    }

    // Validation: name is required
    if (!alumni.name) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: name is required');
        });
    }
    // Validation: promotion must be a number
    if (alumni.promotion && isNaN(alumni.promotion)) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: promotion must be a number');
        });
    }

    return new Promise((resolve, reject) => {
        updateDoc(doc(db, 'alumnis', id), alumni)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function deleteAlumniById(user, id) {
    // Validation: user is required
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: user is required');
        });
    }
    console.log(id)
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, 'alumnis', id))
            .then(() => {
                resolve();
                console.log('Document successfully deleted!');
            })
            .catch(err => {
                reject(err);
            });
    });
}

export {
    getAlumnis,
    getAlumnisByPromotion,
    addAlumni,
    getAlumniById,
    updateAlumniById,
    deleteAlumniById
};

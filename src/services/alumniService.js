import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
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

function addAlumni(alumni) {
    // Validation: name is required
    if (!alumni.name) {
        return new Promise((resolve, reject) => {
            reject('Validation failed: name is required');
        });
    }
    const alumniRef = collection(db, 'alumnis');
    return new Promise((resolve, reject) => {
        alumniRef.add(alumni)
            .then(docRef => {
                resolve(docRef.id);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getAlumniById(id) {
    const alumniRef = collection(db, 'alumnis');
    return new Promise((resolve, reject) => {
        alumniRef.doc(id).get()
            .then(doc => {
                resolve(doc.data());
            })
            .catch(err => {
                reject(err);
            });
    });
}

function updateAlumniById(id, alumni) {
    const alumniRef = collection(db, 'alumnis');
    return new Promise((resolve, reject) => {
        alumniRef.doc(id).update(alumni)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function deleteAlumniById(id) {
    const alumniRef = collection(db, 'alumnis');
    return new Promise((resolve, reject) => {
        alumniRef.doc(id).delete()
            .then(() => {
                resolve();
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

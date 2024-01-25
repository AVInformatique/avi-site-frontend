import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function getEvents() {
    const eventRef = collection(db, 'events');
    const q = query(eventRef);
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then(querySnapshot => {
                const events = [];
                querySnapshot.forEach(doc => {
                    const event = {
                        id: doc.id,
                        ...doc.data()
                    };
                    events.push(event);
                });
                resolve(events);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function addEvent(event) {
    if (!event.name || !event.date) {
        return new Promise((resolve, reject) => {
            reject('Name and date are required');
        });
    }
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef.add(event)
            .then(docRef => {
                resolve(docRef.id);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getEventById(id) {
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef.doc(id).get()
            .then(doc => {
                resolve(doc.data());
            })
            .catch(err => {
                reject(err);
            });
    });
}

function updateEventById(id, event) {
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef.doc(id).update(event)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function deleteEventById(id) {
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef.doc(id).delete()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export {
    getEvents,
    addEvent,
    getEventById,
    updateEventById,
    deleteEventById
};

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function getEvents() {
    const eventRef = collection(db, 'events');
    const q = query(eventRef);
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((querySnapshot) => {
                const events = [];
                querySnapshot.forEach((doc) => {
                    const event = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    events.push(event);
                });
                resolve(events);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getUpcomingEvents() {
    const eventRef = collection(db, 'events');
    const currentTime = new Date().getTime();

    return new Promise((resolve, reject) => {
        getDocs(eventRef)
            .then((querySnapshot) => {
                const upcomingEvents = [];
                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    const eventTime = new Date(eventData.date).getTime();

                    if (eventTime > currentTime) {
                        upcomingEvents.push(eventData);
                    }
                });

                // Sort events by date in descending order
                upcomingEvents.sort((a, b) => a.Date - b.Date);
                resolve(upcomingEvents);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getEventsByYear(year) {
    const eventRef = collection(db, 'events');
    const q = query(eventRef, where('year', '==', year));
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

function addEvent(user, event) {
    // Check if user is logged in
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation error: User is not logged in');
        });
    }

    if (!event.name || !event.date) {
        return new Promise((resolve, reject) => {
            reject('Name and date are required');
        });
    }
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef
            .add(event)
            .then((docRef) => {
                resolve(docRef.id);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getEventById(id) {
    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef
            .doc(id)
            .get()
            .then((doc) => {
                resolve(doc.data());
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function updateEventById(user, id, event) {
    // Check if user is logged in
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation error: User is not logged in');
        });
    }

    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef
            .doc(id)
            .update(event)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function deleteEventById(user, id) {
    // Check if user is logged in
    if (!user) {
        return new Promise((resolve, reject) => {
            reject('Validation error: User is not logged in');
        });
    }

    const eventRef = collection(db, 'events');
    return new Promise((resolve, reject) => {
        eventRef
            .doc(id)
            .delete()
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export {
    getEvents,
    getEventsByYear,
    addEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    getUpcomingEvents
};

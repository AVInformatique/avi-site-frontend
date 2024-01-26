import { collection, getDocs, query } from 'firebase/firestore';
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

function getEventsByTime(month = '', year = '') {
    const eventRef = collection(db, 'events');
    const q = query(eventRef);

    month = (month.length === 1) ? '0' + month : month;
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((snapshot) => {
                let events = [];
                snapshot.forEach((doc) => {
                    let eventData = doc.data();
                    if ( eventData.date.includes(month + '/', 3) &&
                         eventData.date.includes('/' + year)
                    ) {
                        events.push(doc.data());
                    }
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
                upcomingEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                resolve(upcomingEvents);
            })
            .catch((err) => {
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

function updateEventById(id, event) {
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

function deleteEventById(id) {
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
    addEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    getEventsByTime,
    getUpcomingEvents
};

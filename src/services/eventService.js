import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { doc, getDoc } from "firebase/firestore"; // Add this import statement

function getEvents() {
    const eventRef = collection(db,"events");
    const q = query(eventRef, orderBy("date"));
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
    const eventRef = collection(db,"events")
    const currentTime = new Date(); 
    const q = query(eventRef, where("date", ">=", currentTime), orderBy("date", "asc"));
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((querySnapshot) => {
                const upcomingEvents = [];
                querySnapshot.forEach((doc) => {
                    const event = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    upcomingEvents.push(event);
                });
                // Sort events by date in descending order
                upcomingEvents.sort((a, b) => a.date - b.date);
                resolve(upcomingEvents);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function getEventsByYear(year) {
    const eventRef = collection(db,"events")
    const q = query(eventRef, where('year', '==', year), orderBy('date', "asc"));
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

function getEventsByTimeAndName(month, year, name) {
    const eventRef = collection(db,"events")
    const q = query(eventRef, orderBy('date', 'desc'));
    return new Promise((resolve, reject) => {
        getDocs(q)
            .then((querySnapshot) => {
                const events = [];
                querySnapshot.forEach((doc) => {
                    const event = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    
                    const dateE = event.date.toDate() ;
                    const monthE = dateE.getMonth();
                    const yearE = dateE.getFullYear();
                    const nameE = event.name.trim().toLowerCase().normalize('NFKD');
                    const findingName = name.trim().toLowerCase().normalize('NFKD');
                    
                    if (nameE.includes(name) &&
                        ( (month == 0) || (month == (monthE+1)) ) &&
                        ( (year == 0)  || (year == yearE)   )) {
                            events.push(event);
                        }
                });
                // Sort events by date in descending order
                resolve(events);
            })
            .catch((err) => {
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
    const eventRef = doc(db, 'events', id); // Update this line
    return new Promise((resolve, reject) => {
        getDoc(eventRef) // Update this line
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
    getUpcomingEvents,
    getEventsByTimeAndName
};

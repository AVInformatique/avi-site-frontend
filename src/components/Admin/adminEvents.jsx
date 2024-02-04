import { useState, useEffect } from "react";
import {
    getEvents,
    addEvent,
    deleteEventById,
    getEventById,
    updateEventById,
} from "/src/services/eventService.js";
import { Timestamp } from "firebase/firestore";
import PropTypes from "prop-types";

// already css in "./admin.css";

const AdminEvents = (props) => {
    const [events, setEvents] = useState([]);
    const [agenda, setAgenda] = useState("");
    const [showEventModal, setShowEventModal] = useState(false);
    const [showAgendaModal, setShowAgendaModal] = useState(false);
    const [currentActionEvents, setCurrentActionEvents] = useState("Create");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await getEvents();
                setEvents(events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchData();
    }, []);

    const closeModal = () => {
        setShowEventModal(false);
        setShowAgendaModal(false);
        setCurrentActionEvents("None");
    };

    const openEventModal = (action = "Create") => {
        if (action != currentActionEvents) {
            document.getElementById("event-modal").reset();
        }
        setShowEventModal(true);
        setCurrentActionEvents(action);
    };

    const openAgendaModal = (agenda) => {
        setAgenda(agenda);
        setShowAgendaModal(true);
        setShowEventModal(false);
    };

    const showUpdateEvent = async (id) => {
        openEventModal("Update");
        const event = await getEventById(id);
        const form = document.getElementById("event-modal");

        form._id.value = id;
        form.name.value = event.name;
        form.description.value = event.description;
        form.date.value = event.date.toDate().toISOString().slice(0, -8);
        form.agenda.value = event.agenda;
        form.img.value = event.img;
    };

    const onAddEvent = async (event) => {
        event.preventDefault();
        const form = event.target;
        const eventObj = {
            name: form.name.value,
            description: form.description.value,
            date: Timestamp.fromDate(new Date(form.date.value)),
            img: form.img.value,
            agenda: form.agenda.value,
        };
        // Add the event to the database
        eventObj.id = await addEvent(props.currentUser, eventObj);
        setEvents([...events, eventObj]);
        closeModal();
        document.getElementById("event-modal").reset();
    };

    const onUpdateEvent = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form._id.value;
        const eventToUpdate = {
            name: form.name.value,
            description: form.description.value,
            date: Timestamp.fromDate(new Date(form.date.value)),
            img: form.img.value,
            agenda: form.agenda.value,
        };
        // update event
        updateEventById(props.currentUser, id, eventToUpdate);
        setEvents((prevEvents) => {
            return prevEvents.map((eventObj) => {
                if (eventObj.id === id) {
                    return { ...eventObj, ...eventToUpdate };
                } else {
                    return eventObj;
                }
            });
        });
        closeModal();
        document.getElementById("event-modal").reset();
    };

    const onDeleteEvent = (eventId) => {
        // Alert the user to confirm the deletion
        if (!window.confirm("Are you sure you want to delete this event ?")) {
            return;
        }
        // Delete the event from the database and update the state
        deleteEventById(props.currentUser, eventId);
        setEvents(events.filter((event) => event.id !== eventId));
    };

    const renderEventTable = (
        <div className="each-section">
            <div className="admin-addBtn-div">
                <h2>Events Table</h2>
                <button className="admin-addBtn" onClick={openEventModal}>
                    Add event
                </button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Image link</th>
                        <th>Agenda</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date.toDate().toLocaleString()}</td>
                            <td>
                                <a
                                    className={
                                        event.img != null ? "img-admin" : ""
                                    }
                                    href={event.img}
                                >
                                    {event.img != null
                                        ? "Click to open"
                                        : "No link"}
                                </a>
                            </td>
                            <td>
                                <a
                                    className={
                                        event.agenda != null ? "img-admin" : ""
                                    }
                                    onClick={() => {
                                        openAgendaModal(event.agenda);
                                    }}
                                >
                                    {event.agenda != null
                                        ? "Click to open"
                                        : "No agenda"}
                                </a>
                            </td>
                            <td>
                                <button
                                    className="button deleteBtn"
                                    onClick={() => {
                                        onDeleteEvent(event.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className="button updateBtn"
                                    onClick={() => {
                                        showUpdateEvent(event.id);
                                    }}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderEventModal = (
        <div className={showEventModal ? "add-modal" : "no-display"}>
            <h2>{`${currentActionEvents === "Update" ? "Update an event" : "Add a new event"}`}</h2>
            <form id="event-modal"
                onSubmit={ currentActionEvents === "Update" ? onUpdateEvent : onAddEvent}>
                <input type="text" name="_id"
                        style={{ display: "None", height: "0px" }}/>
                
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required /><br />

                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" name="date"
                    min="2018-01-01T00:00"
                    max="2030-12-31T00:00"
                    required/><br />
                
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" required 
                        rows="4" cols="50"/> <br />
                
                <label htmlFor="agenda">Agenda</label>
                <textarea id="agenda" name="agenda" 
                        rows="8" cols="50"/><br />

                <label htmlFor="img">Image link</label>
                <input type="text" id="img" name="img" /><br />
                
                <button type="submit">
                    {currentActionEvents === "Update" ? "Update" : "Add"}
                </button>

                <button type="button" onClick={closeModal}>
                    Close
                </button>
            </form>
        </div>
    );

    const renderAgendaModal = (
        <div className={showAgendaModal ? "agenda-modal" : "no-display"}>
            <h1>Agenda</h1>
            <div className="text-agenda">
                <p>{agenda}</p>
            </div>
            <button onClick={closeModal}>Close</button>
        </div>
    );

    return (
        <div className="admin-event">
            {renderEventTable}
            {renderEventModal}
            {renderAgendaModal}
        </div>
    );
};

AdminEvents.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AdminEvents;

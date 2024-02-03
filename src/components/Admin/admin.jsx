import { useState, useEffect} from "react";
import {getAlumnis, deleteAlumniById, addAlumni, getAlumniById} from "/src/services/alumniService.js";
import {getEvents, addEvent, deleteEventById} from "/src/services/eventService.js";
import { logout } from "/src/services/authService.js";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import PropTypes from "prop-types";
import { Timestamp } from "firebase/firestore";
import { updateAlumniById } from "../../services/alumniService";
import { getEventById, updateEventById } from "../../services/eventService";


const Admin = (props) => {
    const navigate = useNavigate();
    const [alumnis, setAluminis] = useState([]);
    const [events, setEvents] = useState([]);
    const [showAlumniModal, setShowAlumniModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentActionAlumnis, setCurrentActionAlumnis] = useState('Create');
    const [currentActionEvents, setCurrentActionEvents] = useState('Create');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const alumnis = await getAlumnis();
                setAluminis(alumnis);
                const events = await getEvents();
                setEvents(events);
            } catch (error) {
                console.error('Error fetching alumnis:', error);
            }
        };
        fetchData();
    }, []);

    const openAlumniModal = (action='Create') => {
        if (action != currentActionAlumnis) {
            document.getElementById("alumni-modal").reset();
        }
        setShowAlumniModal(true);
        setShowEventModal(false);
        setCurrentActionAlumnis(action)
    };
    
    const closeModal = () => {
        setShowAlumniModal(false);
        setShowEventModal(false);
        setCurrentActionAlumnis('None')
    };

    const openEventModal = (action='Create') => {
        if (action != currentActionEvents ) {
            document.getElementById("event-modal").reset();
        }
        setShowEventModal(true);
        setShowAlumniModal(false);
        setCurrentActionEvents (action)
    };

    const showUpdateAlumni = async (id) => {
        openAlumniModal('Update');
        const alumni = await getAlumniById(id);
        const form = document.getElementById('alumni-modal');

        form._id.value = id;
        form.name.value = alumni.name;
        form.major.value = alumni.major;
        form.promotion.value = alumni.promotion;
        form.image.value = alumni.image;
    }

    const showUpdateEvent = async (id) => {
        openEventModal('Update');
        const event = await getEventById(id);
        const form = document.getElementById('event-modal');

        form._id.value = id;
        form.name.value = event.name;
        form.description.value = event.description;
        form.date.value = event.date.toDate().toISOString().slice(0,-8)
        form.img.value = event.img;
    }

    const onAddAlumni = async (event) => {
        event.preventDefault();
        const form = event.target;
        const alumni = {
            name: form.name.value,
            major: form.major.value,
            promotion: parseInt(form.promotion.value),
            image: form.image.value,
        };
        // Add the alumni to the database
        alumni.id = await addAlumni(props.currentUser, alumni);
        setAluminis([...alumnis, alumni]);
        closeModal();
        document.getElementById("alumni-modal").reset();
    };

    const onAddEvent = async (event) => {
        event.preventDefault();
        const form = event.target;
        const eventObj = {
            name: form.name.value,
            description: form.description.value,
            date: Timestamp.fromDate(new Date(form.date.value)),
            img: form.img.value,
        };
        // Add the event to the database
        event.id = await addEvent(props.currentUser, eventObj);
        setEvents([...events, eventObj]);
        closeModal();
        document.getElementById("event-modal").reset();
    };

    const onUpdateAlumni = (event) => {
        event.preventDefault();
        const form = event.target;
        const id = form._id.value;
        const alumni = {
            name: form.name.value,
            major: form.major.value,
            promotion: parseInt(form.promotion.value),
            image: form.image.value,
        };
        // Add the alumni to the database
        updateAlumniById(props.currentUser, id, alumni);
        alumni.id = id;
        const anotherAlumnis = alumnis.filter((alumni) => alumni.id !== id)
        closeModal();
        setAluminis([...anotherAlumnis, alumni]);
        document.getElementById("alumni-modal").reset();
    }

    const onUpdateEvent = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form._id.value;
        const event = {
            name: form.name.value,
            description: form.description.value,
            date: Timestamp.fromDate(new Date(form.date.value)),
            img: form.img.value,
        };
        // Add the alumni to the database
        updateEventById(props.currentUser, id, event);
        event.id = id;
        const anotherEvents = events.filter((event) => event.id !== id)
        closeModal();
        setEvents([...anotherEvents, event]);
        document.getElementById("event-modal").reset();
    }

    const onDeleteAlumni = (alumniId) => {
        // Alert the user to confirm the deletion
        if (!window.confirm("Are you sure you want to delete this alumni ?")) {
            return;
        }
        // Delete the alumni from the database and update the state
        deleteAlumniById(props.currentUser, alumniId);
        setAluminis(alumnis.filter((alumni) => alumni.id !== alumniId));
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

    const handleSignOut = async () => {
        await logout();
        navigate("/signin");
    };

    const renderHeader = (
        <div className="header-admin">
            <h1>ADMIN</h1>
            <div className="head-bar">
                <p>Your email: {props.currentUser.email}</p> 
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );

    const renderAlumniTable = (
        <div className="each-section">
            <div className="admin-addBtn-div">
                <h2>Alumnis Table</h2>
                <button className="admin-addBtn" onClick={openAlumniModal}>Add alumni</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Major</th>
                        <th>Promotion</th>
                        <th>Image link</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {alumnis.map((alumni) => (
                        <tr key={alumni.id}>
                            <td>{alumni.name}</td>
                            <td>{alumni.major}</td>
                            <td>{alumni.promotion}</td>
                            <td><a className="img-admin" href={alumni.image}>{alumni.image}</a></td>
                            <td><button className="button deleteBtn" onClick={
                                () => {
                                    onDeleteAlumni(alumni.id);
                                }
                            }>Delete</button></td>
                            <td><button className="button updateBtn" onClick={
                                () => {
                                    showUpdateAlumni(alumni.id);
                                }
                            }>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderEventTable = (
        <div className="each-section">
            <div className="admin-addBtn-div">
                <h2>Events Table</h2>
                <button className="admin-addBtn" onClick={openEventModal}>Add event</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Image link</th>
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
                            <td><a className={event.img != null ? "img-admin" : ""} href={event.img}>{event.img != null ? "Click to open" : "No link"}</a></td>
                            <td><button className="button deleteBtn" onClick={
                                () => {
                                    onDeleteEvent(event.id);
                                }
                            }>Delete</button></td>
                            <td><button className="button updateBtn" onClick={
                                () => {
                                    showUpdateEvent(event.id);
                                }
                            }>Update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderAlumniModal = (
        <div className={showAlumniModal ? "add-modal" : "no-display"}>
            <h2>Add a new alumni</h2>
            <form id="alumni-modal"
                onSubmit={currentActionAlumnis === "Update" ? onUpdateAlumni : onAddAlumni}>
                <input type="text" name="_id" style={{display:"None", height:"0px"}}/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required/><br/>
                <label htmlFor="text">Major</label>
                <input type="text" id="major" name="major" required/><br/>
                <label htmlFor="major">Promotion</label>
                <input type="number" id="promotion" name="promotion" required/><br/>
                <label htmlFor="image">Image link</label>
                <input type="text" id="image" name="image" required/><br/>
                <button type="submit">{currentActionAlumnis === "Update" ? "Update":"Add"}</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
            
        </div>
    );

    const renderEventModal = (
        <div className={showEventModal ? "add-modal" : "no-display"}>
            <h2>Add a new event</h2>
            <form id="event-modal" 
                onSubmit={currentActionEvents === "Update" ? onUpdateEvent : onAddEvent}>
                <input type="text" name="_id" style={{display:"None", height:"0px"}}/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required/><br/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" required/><br/>
                <label htmlFor="date">Date</label>
                <input type="datetime-local" 
                        min="2018-01-01T00:00"
                        max="2030-12-31T00:00"
                        id="date" name="date" required/><br/>
                <label htmlFor="img">Image link</label>
                <input type="text" id="img" name="img"/><br/>
                <button type="submit">{currentActionEvents === "Update" ? "Update":"Add"}</button>
                <button type="button" onClick={closeModal}>Close</button>
            </form>
            
        </div>
    );

    return (
        <div className="admin-content">
            {renderHeader}
            {renderAlumniTable}
            {renderEventTable}
            {renderAlumniModal}
            {renderEventModal}
        </div>
    );
}

Admin.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default Admin;
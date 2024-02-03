import { useState, useEffect} from "react";
import {getAlumnis, deleteAlumniById, addAlumni} from "/src/services/alumniService.js";
import {getEvents, addEvent, deleteEventById} from "/src/services/eventService.js";
import { logout } from "/src/services/authService.js";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import PropTypes from "prop-types";
import { Timestamp } from "firebase/firestore";


const Admin = (props) => {
    const navigate = useNavigate();
    const [alumnis, setAluminis] = useState([]);
    const [events, setEvents] = useState([]);
    const [showAlumniModal, setShowAlumniModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);

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

    const openAlumniModal = () => {
        setShowAlumniModal(true);
        setShowEventModal(false);
    };
    
    const closeModal = () => {
        setShowAlumniModal(false);
        setShowEventModal(false);
    };

    const openEventModal = () => {
        setShowEventModal(true);
        setShowAlumniModal(false);
    };

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
        await addAlumni(props.currentUser, alumni);
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
            image: form.image.value,
        };
        // Add the event to the database
        await addEvent(props.currentUser, eventObj);
        setEvents([...events, eventObj]);
        closeModal();
        document.getElementById("event-modal").reset();
    };

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
                    </tr>
                </thead>
                <tbody>
                    {alumnis.map((alumni) => (
                        <tr key={alumni.id}>
                            <td>{alumni.name}</td>
                            <td>{alumni.major}</td>
                            <td>{alumni.promotion}</td>
                            <td><a className="img-admin" href={alumni.image}>{alumni.image}</a></td>
                            <td><button className="deleteBtn" onClick={
                                () => {
                                    onDeleteAlumni(alumni.id);
                                }
                            }>Delete</button></td>
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
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date.toDate().toLocaleString()}</td>
                            <td><a className={event.img != null ? "img-admin" : ""} href={event.img}>{event.img != null ? "Click to open" : "No link"}</a></td>
                            <td><button className="deleteBtn" onClick={
                                () => {
                                    onDeleteEvent(event.id);
                                }
                            }>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderAlumniModal = (
        <div className={showAlumniModal ? "add-modal" : "no-display"}>
            <h2>Add a new alumni</h2>
            <form id="alumni-modal" onSubmit={onAddAlumni}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required/><br/>
                <label htmlFor="major">Major</label>
                <input type="text" id="major" name="major" required/><br/>
                <label htmlFor="promotion">Promotion</label>
                <input type="text" id="promotion" name="promotion" required/><br/>
                <label htmlFor="image">Image link</label>
                <input type="text" id="image" name="image" required/><br/>
                <button type="submit">Add</button>
                <button onClick={closeModal}>Close</button>
            </form>
            
        </div>
    );

    const renderEventModal = (
        <div className={showEventModal ? "add-modal" : "no-display"}>
            <h2>Add a new event</h2>
            <form id="event-modal" onSubmit={onAddEvent}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required/><br/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" required/><br/>
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" name="date" required/><br/>
                <label htmlFor="image">Image link</label>
                <input type="text" id="image" name="image"/><br/>
                <button type="submit">Add</button>
                <button onClick={closeModal}>Close</button>
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
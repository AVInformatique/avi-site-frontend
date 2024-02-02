import {Component, Fragment} from "react";
import {getEvents, deleteEventById, addEvent} from "/src/services/eventService.js";
import PropTypes from "prop-types";

import './AdminEvents.css'

//components
import { ButtonComp } from '/src/components/General/buttonComp';


class AdminEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    async componentDidMount() {
        // Get all events and events from the database, and update the state
        this.setState({events: await getEvents()});
    }


    onAddEvent = (event) => {
        event.preventDefault();
        const form = event.target;
        const eventAdd = {
            name: form.name.value,
            date: new Date(form.date.value),
            description: form.description.value,
            text: form.text.value || '',
            img: form.image.value,
        };
        // Add the event to the database
        addEvent(this.props.currentUser, eventAdd);
        // Update the state
        this.setState({
            events: [...this.state.events, eventAdd],
        });
    }

    onDeleteEvent = (eventId) => {
        // Alert the user to confirm the deletion
        if (!window.confirm("Are you sure you want to delete this event ?")) {
            return;
        }
        // Delete the event from the database and update the state
        deleteEventById(this.props.currentUser, eventId);
        this.setState({
            events: this.state.events.filter((event) => event.id !== eventId),
        });
    }

    showText = (text) => {
        const popUp = document.querySelector(".admin-event.pop-up");
        popUp.classList.remove("hide");
        popUp.classList.add("show");
        const textArea = document.querySelector(".admin-event.pop-up .text-area");
        textArea.innerHTML = text;
    }

    turnOffPopUp = () => {
        const popUp = document.querySelector(".admin-event.pop-up");
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    }

    TimeStampToDate = (time) => {
        if (typeof time.toDate === 'function') {
            return time.toDate();
        }
        return time;
    }

    render() {
        return (
            <Fragment>
                <div className="admin-event pop-up">
                    <div className="content">
                        <button className="close"
                                onClick={this.turnOffPopUp}
                        >✖</button>
                        <p className="text-area">We use cookies for improving user experience, analytics and marketing.</p>
                        <button className="accept"
                                onClick={this.turnOffPopUp}
                        >That's fine!</button>
                    </div>
                </div>
                <div className="admin-events grid wide">
                    <h2 className="title col l-12">Events</h2>
                    <div className="show-events row">
                        <h2 className="title-part col l-12">All events</h2>
                        <table className="col l-12 table-events"
                                border="1" frame="void" rules="rows">
                            <thead>
                                <tr>
                                    <th className="name">Name</th>
                                    <th className="date">Date</th>
                                    <th className="description">Description</th>
                                    <th className="text">Text details</th>
                                    <th className="img">Image link</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.events.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.name}</td>
                                        <td>{this.TimeStampToDate(event.date).toLocaleString()}</td>
                                        <td className="description">{event.description}</td>
                                        <td><button onClick={() => {
                                                this.showText(event.text);}
                                        }>See text</button></td>
                                        <td>
                                            <a href={event.img} target="_blank">
                                                <button>See img</button></a>
                                            </td>
                                        <td><button className="red" onClick={() => {
                                                this.onDeleteEvent(event.id);}
                                        }>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="row add-events container">
                        <h2 className="title-part col l-12">Add a new event</h2>
                        <form className="col l-12" 
                            onSubmit={this.onAddEvent}>

                            <div className="form-row"> <div className="input-data">
                                    <input type="text" name="name" required/><br/>
                                    <div className="underline"></div>
                                    <label htmlFor="name">Name</label>
                            </div></div>

                            <div className="form-row"> <div className="input-data">
                                    <input type="datetime-local" name="date" className="date" required
                                            min="2015-01-01T00:00"
                                            max="2030-12-31T23:59"/><br/>
                                    <div className="underline"></div>
                                    <label htmlFor="major">Date</label>
                            </div></div>

                            <div className="form-row"> <div className="input-data textarea">
                                    <textarea type="text" name="description" 
                                                rows="4" cols="150" required></textarea><br />
                                    <div className="underline"></div>
                                    <label htmlFor="description">Description</label><br />
                            </div></div>

                            <div className="form-row"> <div className="input-data textarea big">
                                    <textarea type="text" name="text" 
                                            rows="20" cols="150"></textarea><br/>
                                    <div className="underline"></div>
                                    <label htmlFor="text">Details</label><br />
                            </div></div>

                            <div className="form-row"> <div className="input-data">
                                    <input type="text" name="image" required/><br/>
                                    <div className="underline"></div>
                                    <label htmlFor="image">Image link</label><br />
                            </div></div>
                            
                            <ButtonComp
                                divClassName="btn-submit"
                                size='small'
                                color = 'red'
                                text = 'Add'
                                isUsedSubmit = {true}
                            ></ButtonComp>
                        </form>
                    </div>
                    
                </div>
            </Fragment>
            
        );
    }
}

AdminEvents.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AdminEvents;
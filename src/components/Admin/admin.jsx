import {Component} from "react";
import {getAlumnis, deleteAlumniById, addAlumni} from "/src/services/alumniService.js";
import {getEvents} from "/src/services/eventService.js";
import PropTypes from "prop-types";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alumnis: [],
            events: [],
        };
    }

    async componentDidMount() {
        // Get all alumnis and events from the database, and update the state
        this.setState({
            alumnis: await getAlumnis(),
            events: await getEvents(),
        });
    }


    onAddAlumni = (event) => {
        event.preventDefault();
        const form = event.target;
        const alumni = {
            name: form.name.value,
            major: form.major.value,
            promotion: parseInt(form.promotion.value),
            image: form.image.value,
        };
        // Add the alumni to the database
        addAlumni(this.props.currentUser, alumni);
        // Update the state
        this.setState({
            alumnis: [...this.state.alumnis, alumni],
        });
    }

    onDeleteAlumni = (alumniId) => {
        // Alert the user to confirm the deletion
        if (!window.confirm("Are you sure you want to delete this alumni ?")) {
            return;
        }
        // Delete the alumni from the database and update the state
        deleteAlumniById(this.props.currentUser, alumniId);
        this.setState({
            alumnis: this.state.alumnis.filter((alumni) => alumni.id !== alumniId),
        });
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                {/* List all alumnis in a table and add a column with a button to delete the alumni */}
                <h2>Alumnis</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Major</th>
                            <th>Promotion</th>
                            <th>Image link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.alumnis.map((alumni) => (
                            <tr key={alumni.id}>
                                <td>{alumni.name}</td>
                                <td>{alumni.major}</td>
                                <td>{alumni.promotion}</td>
                                <td>{alumni.image}</td>
                                <td><button onClick={
                                    () => {
                                        this.onDeleteAlumni(alumni.id);
                                    }
                                }>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Form to add a new alumni */}
                <h2>Add a new alumni</h2>
                <form onSubmit={this.onAddAlumni}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required/><br/>
                    <label htmlFor="major">Major</label>
                    <input type="text" id="major" name="major" required/><br/>
                    <label htmlFor="promotion">Promotion</label>
                    <input type="text" id="promotion" name="promotion" required/><br/>
                    <label htmlFor="image">Image link</label>
                    <input type="text" id="image" name="image" required/><br/>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

Admin.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default Admin;
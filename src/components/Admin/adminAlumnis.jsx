import {Component, Fragment} from "react";
import {getAlumnis, deleteAlumniById, addAlumni} from "/src/services/alumniService.js";
import {getEvents} from "/src/services/eventService.js";
import PropTypes from "prop-types";

import './adminAlumnis.css'

//components
import { ButtonComp } from '/src/components/General/buttonComp';


class AdminAlumnis extends Component {
    constructor(props) {
        super(props);
        this.state = {alumnis: []};
    }

    async componentDidMount() {
        this.setState({
            alumnis: await getAlumnis(),
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
            <div className="admin-alumnis grid wide">
                <h2 className="title col l-12">Alumnis</h2>
                <div className="show-alumnis row">
                    <h2 className="title-part col l-12">All alumnis</h2>
                    <table className="col l- table-alumnis"
                        border="1" frame="void" rules="rows">
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
                </div>
                
                <div className="row add-alumnis container">
                    <h2 className="title-part col l-12">Add a new alumni</h2>
                    <form className="col l-12" 
                          onSubmit={this.onAddAlumni}>

                        <div className="form-row"> <div className="input-data">
                                <input type="text" id="name" name="name" required/><br/>
                                <div className="underline"></div>
                                <label htmlFor="name">Name</label>
                        </div></div>

                        <div className="form-row"> <div className="input-data">
                                <input type="text" id="major" name="major" required/><br/>
                                <div className="underline"></div>
                                <label htmlFor="major">Major</label>
                        </div></div>

                        <div className="form-row"> <div className="input-data">
                                <input type="text" id="promotion" name="promotion" required/><br/>
                                <div className="underline"></div>
                                <label htmlFor="promotion">Promotion</label>
                        </div></div>

                        <div className="form-row"> <div className="input-data">
                                <input type="text" id="image" name="image" required/><br/>
                                <div className="underline"></div>
                                <label htmlFor="image">Image link</label>
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
        );
    }
}

AdminAlumnis.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AdminAlumnis;
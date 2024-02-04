import { useState, useEffect } from "react";
import {
    getAlumnis,
    deleteAlumniById,
    addAlumni,
    getAlumniById,
    updateAlumniById,
} from "/src/services/alumniService.js";
import PropTypes from "prop-types";
import { Timestamp } from "firebase/firestore";

// already css in "./admin.css";

const AdminAlumnis = (props) => {
    const [alumnis, setAluminis] = useState([]);
    const [showAlumniModal, setShowAlumniModal] = useState(false);
    const [currentActionAlumnis, setCurrentActionAlumnis] = useState("Create");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const alumnis = await getAlumnis();
                setAluminis(alumnis);
            } catch (error) {
                console.error("Error fetching alumnis:", error);
            }
        };
        fetchData();
    }, []);

    const openAlumniModal = (action = "Create") => {
        if (action != currentActionAlumnis) {
            document.getElementById("alumni-modal").reset();
        }
        setShowAlumniModal(true);
        setCurrentActionAlumnis(action);
    };

    const closeModal = () => {
        setShowAlumniModal(false);
        setCurrentActionAlumnis("None");
    };

    const showUpdateAlumni = async (id) => {
        openAlumniModal("Update");
        const alumni = await getAlumniById(id);
        const form = document.getElementById("alumni-modal");

        form._id.value = id;
        form.name.value = alumni.name;
        form.major.value = alumni.major;
        form.promotion.value = alumni.promotion;
        form.image.value = alumni.image;
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
        alumni.id = await addAlumni(props.currentUser, alumni);
        setAluminis([...alumnis, alumni]);
        closeModal();
        document.getElementById("alumni-modal").reset();
    };

    const onUpdateAlumni = (event) => {
        event.preventDefault();
        const form = event.target;
        const id = form._id.value;
        const alumniToUpdate = {
            name: form.name.value,
            major: form.major.value,
            promotion: parseInt(form.promotion.value),
            image: form.image.value,
        };
        // Add the alumni to the database
        updateAlumniById(props.currentUser, id, alumniToUpdate);
        setAluminis((prevAlumnis) => {
            return prevAlumnis.map((alumni) => {
                if (alumni.id === id) {
                    return { ...alumni, ...alumniToUpdate };
                } else {
                    return alumni;
                }
            });
        });
        closeModal();
        document.getElementById("alumni-modal").reset();
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

    const renderAlumniTable = (
        <div className="each-section">
            <div className="admin-addBtn-div">
                <h2>Alumnis Table</h2>
                <button className="admin-addBtn" onClick={openAlumniModal}>
                    Add alumni
                </button>
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
                            <td>
                                <a className="img-admin" href={alumni.image}>
                                    {alumni.image}
                                </a>
                            </td>
                            <td>
                                <button
                                    className="button deleteBtn"
                                    onClick={() => {
                                        onDeleteAlumni(alumni.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className="button updateBtn"
                                    onClick={() => {
                                        showUpdateAlumni(alumni.id);
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

    const renderAlumniModal = (
        <div className={showAlumniModal ? "add-modal" : "no-display"}>
            <h2>{`${currentActionAlumnis === "Update" ? "Update an alumni" : "Add a new alumni"}`}</h2>
            <form
                id="alumni-modal"
                onSubmit={
                    currentActionAlumnis === "Update"
                        ? onUpdateAlumni
                        : onAddAlumni
                }
            >
                <input
                    type="text"
                    name="_id"
                    style={{ display: "None", height: "0px" }}
                />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
                <br />
                <label htmlFor="text">Major</label>
                <input type="text" id="major" name="major" required />
                <br />
                <label htmlFor="major">Promotion</label>
                <input type="number" id="promotion" name="promotion" required />
                <br />
                <label htmlFor="image">Image link</label>
                <input type="text" id="image" name="image" required />
                <br />
                <button type="submit">
                    {currentActionAlumnis === "Update" ? "Update" : "Add"}
                </button>
                <button type="button" onClick={closeModal}>
                    Close
                </button>
            </form>
        </div>
    );

    return (
        <div className="admin-alumnis">
            {renderAlumniTable}
            {renderAlumniModal}
        </div>
    );
};

AdminAlumnis.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AdminAlumnis;

// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import {getAlumnis} from "/src/services/alumniService.js";
import "./alumnis.css";

// Component for displaying all alumnis
import {AlumniBox} from "./alumniBox.jsx";

class Alumnis extends Component {
  state = {
    alumnis: [],
  };

  componentDidMount() {
    getAlumnis().then((data) => {
        this.setState({ alumnis: data });
    })
        .catch((error) => console.log(error));
  }

  render() {
      // Each row contains 3 alumni boxes
      // Config in alumnis.css
    // return (
      // <div>
      //   <div className="row">
      //     {this.state.alumnis.map((alumni) => (
      //       <div className="column" key={alumni.id}>
      //         <AlumniBox name={alumni.name} major={alumni.major} promotion={alumni.promotion} image={alumni.image} />
      //       </div>
      //     ))}
      //   </div>
      // </div>
    // );
  }
}

export default Alumnis;
import axios from "axios";
import React, { Component } from "react";

class Alumnis extends Component {
  state = {
    alumnis: [],
  };

  componentDidMount() {
    axios.get("http://avi-back.francecentral.azurecontainer.io/api/v1/users").then((res) => {
      const alumnis = res.data;
      this.setState({ alumnis });
    });
  }

  render() {
    return (
      <div>
        <h1>Alumnis</h1>
        <ul>
          {this.state.alumnis.map((alumni) => (
            <li key={alumni.id}>{alumni.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Alumnis;
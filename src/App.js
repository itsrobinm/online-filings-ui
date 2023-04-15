import axios from "axios";
import React, { Component } from "react";
import { Accordion } from "./components/Accordion";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      selectedProject: 0,
      currentTasks: [],
    };

    //getData();
  }

  async componentDidMount() {
    let res = await axios.post("/api/projects");
    //console.log(res.data.tasks[0]);
    console.log(res.data);
    this.setState({ projects: res.data.projects, currentTasks: res.data.projects[0].tasks });
    //console.log(this.state.projects);
  }

  myFunc(index) {
    //console.log(`you clickedd ${index}`);
    this.setState({
      selectedProject: index,
      currentTasks: this.state.projects[index].tasks,
    });
    //console.log();
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          className="container"
          style={{ width: "50%", backgroundColor: "#ebebeb" }}
        >
          <h1>Projects</h1>
          <div style={{ marginLeft: "2rem" }}>
            {this.state.projects.map((project, index) => (
              <h3
                onClick={() => {
                  this.myFunc(index);
                }}
                style={{
                  cursor: "pointer",
                  color:
                    this.state.selectedProject == index ? "red" : "initial",
                }}
              >
                {project.projectName}
              </h3>
            ))}
          </div>
          {/* <Accordion/> */}
        </div>
        <div className="container" style={{ width: "50%" }}>
          <h1>Tasks</h1>
          <div style={{ marginLeft: "2rem" }}>
          {this.state.currentTasks.map((task, index) => (
              <h3>
                {task.taskName}
              </h3>
            ))}
          </div>
          {/* <Accordion/> */}
        </div>
      </div>
    );
  }
}

export default App;

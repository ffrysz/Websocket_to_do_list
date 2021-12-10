import React from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskName: '',
    };
  }

  componentDidMount() {
    this.socket = io('localhost:8000');
    this.socket.on('updateData', (tasks) => {
      this.setState({ tasks: tasks });
    });
    this.socket.on('addTask', (task) => {
      this.addTask(task);
    });
    this.socket.on('removeTask', (taskIndex) => {
      const fromServer = true;
      this.removeTask(taskIndex, fromServer);
    });
  }

  removeTask(taskIndex, fromServer) {
    this.state.tasks.splice(taskIndex, 1);
    this.setState({ tasks: this.state.tasks });
    if (!fromServer) {
      this.socket.emit('removeTask', taskIndex);
    }
  }

  handleChange(event) {
    this.setState({ taskName: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    this.addTask(this.state.taskName);
    this.socket.emit('addTask', this.state.taskName);
  }

  addTask(task) {
    this.setState({ tasks: [...this.state.tasks, task] });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks.map((element, index) => {
              return <li key={index} className="task">{element}<button className="btn btn--red" onClick={() => this.removeTask(index)}>Remove</button></li>
            })}
          </ul>

          <form id="add-task-form" onSubmit={(event) => this.submitForm(event)}>
            <input onChange={(event) => this.handleChange(event)} className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={this.state.taskName} />
            <button className="btn" type="submit">Add</button>
          </form>
        </section>
      </div>
    );
  };

};

export default App;

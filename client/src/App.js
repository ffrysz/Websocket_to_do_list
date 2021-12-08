import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tasks: ['Umyć okna', 'Zjeść', 'Wyspać się'] };
  }

  componentDidMount() {
    this.socket = io('localhost:8000');
  }

  removeTask(taskIndex) {
    this.state.tasks.splice(taskIndex, 1);
    this.setState({ tasks: this.state.tasks });
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

          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;

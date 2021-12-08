import React from 'react';
import io from 'socket.io';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { tasks: ['Umyć okna', 'Zjeść'] };
  }

  componentDidMount() {
    this.socket = io(8000);
    // this.socket.connect("localhost:8000");
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
            {this.state.tasks.map((element) => {
              return <li class="task">{element}<button class="btn btn--red">Remove</button></li>
            })}
          </ul>

          <form id="add-task-form">
            <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

export default App;

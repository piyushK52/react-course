import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "asj2n3", name: "Piyush", age: 22 },
      { id: "jksdn4", name: "Manu", age: 29 },
      { id: "sdkjn3", name: "Stephanie", age: 22 }
    ],
    otherState: "some other values",
    showPersons: false
  };

  switchNameHandler = name => {
    //console.log('was clicked');
    // DON'T DO THIS personsState.persons[0].name = 'Pop rock';
    this.setState({
      persons: [
        { name: "Pop rock!", age: 22 },
        { name: "Manu", age: 29 },
        { name: "Stephanie", age: 28 }
      ],
      otherState: "some other values"
    });
  };

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });
    const person = {...this.state.persons[personIndex]}; 
    person.name = event.target.value; 
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons});
  };

  togglePersonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  deletePersonHandler = personIndex => {
    // const person = this.state.persons.slice(); slice without argument  copies it to the new array
    // no using slice will store a reference of persons in person
    const person = [...this.state.persons]; // another way of copying the persons object
    // good practice is always to copy the current the state, change it then update the using setState
    person.splice(personIndex, 1);
    this.setState({ persons: person });
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div className="">
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                key={person.id}
                name={person.name}
                age={person.age}
                changed={(event)=>this.nameChangedHandler(event,person.id)}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi I am a react App</h1>
        <button style={style} onClick={this.togglePersonHandler}>
          Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

export default App;

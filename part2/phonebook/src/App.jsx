import { useEffect, useState } from "react";
import axios from "axios";
import person from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotificaion] = useState(null);

  useEffect(() => {
    person.getAll().then((intialState) => {
      setPersons(intialState);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,replace the old number with a new one?`
        )
      ) {
        const updatePerson = { ...existingPerson, number: newNumber };
        person
          .update(existingPerson.id, updatePerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== existingPerson.id ? p : response))
            );
            setNotificaion(`${newName} is added`);
            setTimeout(() => {
              setNotificaion(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificaion(`the person is already deleted from server`);
            setTimeout(() => {
              setNotificaion(null);
            }, 5000);
            person.getAll();
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
      };
      person.create(newObject).then((response) => {
        setPersons([...persons, response]);
        setNotificaion(`${newName} is added`);
        setTimeout(() => {
          setNotificaion(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      person
        .deleteRequest(id)
        .then((returnedValue) => {
          setPersons(persons.filter((n) => n.id !== id));
        })
        .catch((error) => {
          setNotificaion(`the person is already deleted from server`);
          setTimeout(() => {
            setNotificaion(null);
          }, 5000);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

const Filter = ({ handleFilter }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={handleFilter} />
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  setNewNumber,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => {
        return (
          <div key={person.id}>
            <span>{person.name}</span>
            <span>{person.number}</span>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        );
      })}
    </>
  );
};

const Notification = ({ message }) => {
  if (message == null) {
    return;
  }
  const styles = {
    color: "green",
    background: "lightgrey",
    border: "solid",
    padding: "10px",
    marginBottom: "20px",
  };
  return (
    <div style={styles}>
      <div>{message}</div>
    </div>
  );
};
export default App;

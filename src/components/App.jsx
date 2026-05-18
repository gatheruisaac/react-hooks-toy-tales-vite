 import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  // Stores all toy data
  const [toys, setToys] = useState([]);

  // Controls showing/hiding form
  const [showForm, setShowForm] = useState(false);

  // Fetch toys when app first loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  // Toggle toy form visibility
  function handleClick() {
    setShowForm(!showForm);
  }

  // Add newly created toy to state
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // Remove toy after donation
  function deleteToy(id) {
    const updatedToys = toys.filter(
      (toy) => toy.id !== id
    );

    setToys(updatedToys);
  }

  // Update likes after clicking like button
  function updateLikes(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id
        ? updatedToy
        : toy
    );

    setToys(updatedToys);
  }

  return (
    <>
      <Header />

      {showForm && (
        <ToyForm addToy={addToy} />
      )}

      <div className="buttonContainer">
        <button onClick={handleClick}>
          Add a Toy
        </button>
      </div>

      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        updateLikes={updateLikes}
      />
    </>
  );
}

export default App;
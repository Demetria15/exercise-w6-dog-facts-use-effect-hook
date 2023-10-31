import { useState, useEffect } from "react";
import { DogFact } from "./components/DogFact";

export const App = () => {
  // Initialize state for storing the dog fact
  const [fact, setFact] = useState("");

  // Use the useEffect hook to fetch the dog fact when the component mounts
  useEffect(() => {
    // Define the API endpoint
    const apiUrl = "https://dogapi.dog/api/v2/facts";

    // Create a function to fetch the dog fact
    const fetchDogFact = () => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          const dogFact = data?.fact?.attributes?.body;
          setFact(dogFact); // Update the state with the dog fact
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    

    // Call the fetchDogFact function to fetch data when the component mounts
    fetchDogFact();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="App">
      <DogFact fact={fact} /> {/* Pass the 'fact' prop to the DogFact component */}
    </div>
  );
};


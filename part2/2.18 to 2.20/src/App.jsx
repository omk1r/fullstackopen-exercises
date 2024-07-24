import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (inputCountry) {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${inputCountry}`
          );
          setCountries(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setCountries([]);
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // Adding a debounce of 500ms
    return () => clearTimeout(timeoutId); // Clean up the timeout if inputCountry changes
  }, [inputCountry]);

  const handleShowCountry = (country) => {
    console.log(country);
    setSelectedCountry(country);
  };

  return (
    <div>
      <label>
        find countries
        <input
          type="text"
          value={inputCountry}
          onChange={(e) => setInputCountry(e.target.value)}
        />
      </label>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length > 1 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      ) : countries.length === 1 ? (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital: {countries[0].capital[0]}</p>
          <p>Area: {countries[0].area} km²</p>
          <img
            src={countries[0].flags.svg}
            alt={`Flag of ${countries[0].name.common}`}
            width="100"
          />
          <p>Languages:</p>
          <ul>
            {Object.values(countries[0].languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No matches found</p>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <img
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            width="100"
          />
          <p>Languages:</p>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

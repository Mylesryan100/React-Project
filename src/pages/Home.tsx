import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Country } from "../types/Country";

function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [error, setError] = useState<string | null>(null);





  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark");


    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital"
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }


        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load countries. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filtered = countries.filter(country => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRegion = region ? country.region === region : true;

    return matchesSearch && matchesRegion;
  });


  return (

    <>

    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <div className="container">
        {/* Filters */}
        <input
          className="form-control"
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", flex: 1 }}
        />
      </div>


      <div className="col-md-6">
        {/* Region Filter */}
        <select
        className="form-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>

      {/* <h3>All Countries</h3> */}

      {/* Countries Grid */}
      <div className="row g-4">
        {filtered.map((country) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={country.cca3}>
            <Link to={`/country/${country.cca3}`} className="text-decoration-none text-dark">
              <div className="card h-100 shadow">
                <img src={country.flags.png} className="card-img-top" />
                <div className="card-body">
                  <h5>{country.name.common}</h5>
                  <p>Population: {country.population?.toLocaleString()}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital?.[0] ?? "N/A"}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
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
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-900 dark:text-slate-100">
      {/* Filters */}
      <section
        className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        aria-label="Search and filter countries"
      >
        {/* Search */}
        <div className="w-full max-w-md">
          <label className="visually-hidden" htmlFor="search-input">
            Search for a country
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md bg-white px-4 py-3 text-sm shadow placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Region Filter */}
        <div>
          <label className="visually-hidden" htmlFor="region-filter">
            Filter by Region
          </label>
          <select
            id="region-filter"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-52 rounded-md bg-white px-3 py-3 text-sm shadow focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>

      {/* Loading / Error states */}
      {loading && (
        <p className="mb-4 text-center text-slate-500 dark:text-slate-400">
          Loading countries…
        </p>
      )}

      {error && (
        <p className="mb-4 text-center text-red-500" aria-live="polite">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="mb-4 text-center text-slate-500 dark:text-slate-400">
          No countries match your search/filter.
        </p>
      )}

      {/* Countries Grid */}
      <section
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="List of countries"
      >
        {filtered.map((country) => (
          <Link
            key={country.cca3}
            to={`/country/${country.cca3}`}
            className="group block h-full focus:outline-none"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800">
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col gap-1 px-4 py-4 text-sm">
                <h5 className="mb-1 text-base font-extrabold">
                  {country.name.common}
                </h5>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population?.toLocaleString() ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region ?? "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital?.[0] ?? "N/A"}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type Country } from "../types/Country";

function CountryCard() {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setError(null);
        setCountry(null);
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error(error);
        setError("Failed to load country details. Please try again.");
      }
    };

    fetchCountry();
  }, [code]);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          ⬅ Back
        </Link>
        <p className="mt-6 text-red-500">{error}</p>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-slate-500 dark:text-slate-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        ⬅ Back
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <img
            src={country.flags.svg}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="h-auto w-full max-h-[320px] rounded-md object-cover shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            {country.name.common}
          </h2>

          <ul className="space-y-1 text-sm md:text-base">
            <li>
              <span className="font-semibold">Population:</span>{" "}
              {country.population?.toLocaleString() ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Region:</span>{" "}
              {country.region ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Capital:</span>{" "}
              {country.capital?.[0] ?? "N/A"}
            </li>
          </ul>

          {country.borders?.length ? (
            <div className="mt-4">
              <span className="text-sm font-semibold md:text-base">
                Border Countries:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {country.borders.map((b) => (
                  <Link
                    key={b}
                    to={`/country/${b}`}
                    className="rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No border countries.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryCard;

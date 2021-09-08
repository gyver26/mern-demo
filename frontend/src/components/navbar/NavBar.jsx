import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

function NavBar() {
  const { moviesSearch, setMoviesSearch } = useAppContext();

  const handleMovieSearchChange = (e) => {
    setMoviesSearch(e.target.value);
  };

  return (
    <nav className="text-white container mx-auto flex items-center">
      <div className="inline-block mr-6 text-red-600 text-4xl font-bold">
        MFlix
      </div>
      <ul className="flex-grow">
        <li className="p-1 inline-block">
          <Link to="/">Movies</Link>
        </li>
        <li className="p-1 inline-block">
          <Link to="/theaters">Theaters</Link>
        </li>
      </ul>
      <div className="text-black">
        <input
          className="p-2"
          type="text"
          value={moviesSearch}
          onChange={handleMovieSearchChange}
          placeholder="Search Movies..."
        />
      </div>
    </nav>
  );
}

export default NavBar;

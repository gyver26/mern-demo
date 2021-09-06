import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Movies from "./components/Movies/";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav className="bg-black p-4 text-white">
            <div className="inline-block px-6 text-red-600 text-4xl font-bold">
              MFlix
            </div>
            <ul className="inline-block">
              <li className="p-1 inline-block">
                <Link to="/">Movies</Link>
              </li>
              <li className="p-1 inline-block">
                <Link to="/theaters">Theaters</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/theaters">
              <Theaters />
            </Route>
            <Route path="/">
              <Movies />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function Theaters() {
  return <h2>Theaters</h2>;
}

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Movies from "./components/movies";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "./context/AppProvider";
import NavBar from "./components/navbar";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="bg-black p-4">
            <NavBar />
          </div>
          <div>
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
    </AppProvider>
  );
}

function Theaters() {
  return <h2>Theaters</h2>;
}

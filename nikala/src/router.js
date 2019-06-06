import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './components/main';
import margaritabot from './components/maragaritabot';
import fishermanbot from './components/fishermanbot';

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={Main} />
        <Route path="/margaritabot/" component={margaritabot} />
        <Route path="/fishermanbot/" component={fishermanbot} />
    </Router>
  );
}

export default AppRouter;
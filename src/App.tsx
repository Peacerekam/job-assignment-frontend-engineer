import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Article, ArticleList, Editor, LoginRegister, Logout, Profile, Settings } from "./pages";
import { Footer, Navbar, NotificationsBar } from "components";

import "./style.scss";

const App: React.FC = () => {
  return (
    <Router>
      <NotificationsBar />
      <Navbar />
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={LoginRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={LoginRegister} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/:slug" exact component={Article} />
        <Route path="/" component={ArticleList} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

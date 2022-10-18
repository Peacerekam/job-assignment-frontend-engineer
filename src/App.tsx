import React from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Article, ArticleList, Editor, LoginRegister, Logout, Profile, Settings } from "./pages";
import { Footer, Navbar, Notifications, Spinner } from "components";
import { useUser } from "hooks";
import "./style.scss";

axios.defaults.baseURL = "http://localhost:3000";

const App: React.FC = () => {
  const user = useUser();
  const pendingAuth = user?.loggedIn === undefined;

  return (
    <Router>
      <Notifications />
      <Navbar user={user} />
      {!pendingAuth ? (
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
      ) : (
        <Spinner />
      )}
      <Footer />
    </Router>
  );
};

export default App;

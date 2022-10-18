import { useHistory, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { User } from "hooks";
import { getMockedFullName, setUserToken } from "../../utils/helpers";

type NavbarProps = {
  user?: User;
};

type NavElement = {
  name: string;
  path: string;
  icon?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation();
  const history = useHistory();

  const navLinks: NavElement[] = useMemo(() => {
    const tmp: NavElement[] = [
      { name: "Home", path: "/" },
      { name: "New Article", icon: <i className="ion-compose" />, path: "/editor" },
      { name: "Settings", icon: <i className="ion-gear-a" />, path: "/settings" },
    ];

    if (user?.loggedIn) {
      const userName = getMockedFullName(user.username);
      const handleLogOut = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setUserToken("");
        history.push("/logout");
      };

      tmp.push(
        { name: `Hi, ${userName}!`, path: `/profile/${user.username}` },
        { name: "Log out", path: "/logout", onClick: handleLogOut }
      );
    } else {
      tmp.push({ name: "Sign in", path: "/login" }, { name: "Sign up", path: "/register" });
    }

    return tmp;
  }, [user, history]);

  const navigationElements = useMemo(
    () =>
      navLinks.map(navLink => {
        const { name, icon, path, onClick } = navLink;
        const isActive = location.pathname === path;
        const classNames = ["nav-link", isActive ? "active" : ""].join(" ").trim();
        const newPathName = `/#${path}`;
        return (
          <li key={name} className="nav-item" {...(onClick && { onClick })}>
            {/* Add "active" class when you're on that page" */}
            <a className={classNames} href={newPathName}>
              {icon}
              {name}
            </a>
          </li>
        );
      }),
    [location, navLinks]
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">{navigationElements}</ul>
      </div>
    </nav>
  );
};

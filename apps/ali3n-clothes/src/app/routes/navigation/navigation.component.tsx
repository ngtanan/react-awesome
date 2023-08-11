import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as SiteLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutAuth } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <SiteLogo className="logo"/>
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">SHOP</Link>
          <Link to="/about" className="nav-link">CONTACT</Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutAuth}>SIGN OUT</span>
          ) : (
            <Link to="/auth" className="nav-link">SIGN IN</Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
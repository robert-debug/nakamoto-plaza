import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SideBar from "./components/SideBar"
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className='app-container'>
        <div className='header-div'>
          <NavBar />
        </div>
      <Switch>
        <Route path="/login" exact={true}>
          <div className='main-div'>
            <LoginForm />
          </div>
        </Route>
        <Route path="/sign-up" exact={true}>
          <div className='main-div'>
            <SignUpForm />
          </div>
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <div>
            <UsersList/>
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <div className='main-div'>
            <User />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <div className='sidebar-div'>
            <SideBar />
          </div>
          <div className='main-div'>
            <h1>My Home Page</h1>
          </div>
        </ProtectedRoute>
      </Switch>
      </div>
      <div>

      </div>
    </BrowserRouter>
  );
}

export default App;

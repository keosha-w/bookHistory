import { Redirect, Route } from "react-router"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"

export const BookHistory = () => (
<>
    <Route
      render={() => {
        if (localStorage.getItem("bookHistory_user")) {
          return (
            <>
              <NavBar />
              <h1>bookHistory</h1>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)

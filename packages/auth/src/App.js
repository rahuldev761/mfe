import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path={"/auth/signin"}>
              <SignIn onSignIn={onSignIn} />
            </Route>
            <Route exact path={"/auth/signup"}>
              <SignUp onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

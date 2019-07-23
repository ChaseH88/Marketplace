import React, { Component } from "react";
import "./App.css";
import { Auth, Hub } from "aws-amplify";  
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import MarketPage from "./pages/MarketPage";
import ProfilePage from "./pages/ProfilePage";

// Components
import NavBar from "./components/Navbar";
import { async } from "q";

const theme = {
  ...AmplifyTheme
}

class App extends Component {

  state = {
    currentUser: null
  }
  
  getUserData = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    userData ?
      this.setState({
        currentUser: userData
      }) :
      this.setState({
        currentUser: null
      });
  }
  
  componentDidMount(){
    this.getUserData();
    Hub.listen("auth", this, "onHubCapsule");
  }

  onHubCapsule = (capsule) => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log("Signed In");
        this.getUserData();
        break;
      case "signUp":
        console.log("Signed Up");
        break
      case "signout":
        this.setState({
          currentUser: null
        });
        console.log("Signed Out");
        break
      default:
        return;
    }
  }

  handleSignout = async () => {
    try {
      const signOut = await Auth.signOut();
      this.setState({
        currentUser: null
      });
    } 
    catch (err) {
      throw err;
    }
  }

  render(){
    return !this.state.currentUser ?
    (
      <Authenticator theme={theme} />
    ) :
    (
      <BrowserRouter>
        <React.Fragment>
        <NavBar currentUser={this.state.currentUser} signOut={this.handleSignout} />
          <Switch>
            <Route exact path="/" component={() => <HomePage />} />
            <Route exact path="/profile" component={() => <ProfilePage />} />
            <Route exact path="/market/:id" render={({ match }) => <MarketPage id={match.params.id}  />} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  };
}

export default App;
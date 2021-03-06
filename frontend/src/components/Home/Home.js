import { useContext } from "react";
import Container from "react-bootstrap/Container";
import classes from "./Home.module.css";
import logo from "../../assets/Query.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button, Anchor } from "atomize";
import { Row, Col} from "react-bootstrap";
import wallIamge from "../../assets/square_mid_light.svg"


//firebase 
import { UserContext } from "../../context/UserContext";
import firebase from "firebase/app";
import "firebase/auth"
var provider = new firebase.auth.GoogleAuthProvider();

const Home = () => {

  const context = useContext(UserContext)

  const handleLogin = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      context.setUser(result.user);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  const handleLogut = () => {
    firebase.auth().signOut().then(() => {
      console.log("logout")
      context.setUser(null)
    }).catch((error) => {
      console.log("logout Error")  
    });
  }

  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      // window.location = '/visualizer';
    }
    else{
      localStorage.removeItem('authUser');
    }
  });

  return (
    
    <div style = {{backgroundImage: `url(${wallIamge})`}}>
      <Navbar>
        <div className = {classes.home__navbar__brand}>
          <img src={logo} className = {classes.home__navbar__brand__logo} alt="Querylizer" />
          <span style={{ fontWeight: "800" }}>Query</span>lizer
        </div>
        <div style={{ fontSize: "1.7rem", paddingTop: "10px", paddingRight: "30px"}} className="ml-auto">
          <Nav>
            <Nav.Link href="#home" className = {classes.home__navbar__logo}>
              <i className= {"far fa-envelope " + classes.home__navbar__icons}></i>
            </Nav.Link>
            <Nav.Link href="#features">
              <i className = {"fab fa-github " + classes.home__navbar__icons}></i>
            </Nav.Link>
            <Nav.Link href="/visualizer">
              <i className= {"fas fa-sign-in-alt " + classes.home__navbar__icons}></i>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
      <Container className="text-center">
        <div>
          <h1 className = {classes.home_h1_text}>
            Create Stunning 🚩 Blazing ⚡ Interactive 🧠{" "}
            <span className={classes.home_span_gradient}>
              <br/>
              <br/>
              Database Diagrams{" "}
            </span>
            🚀
          </h1>
        </div>
        <br />
        {/* <h2 style={{ fontSize: "2.0rem", fontWeight: "300" }}> */}
        <h2><span className = {classes.home_h2_text}>
          Say Hi 👋 to the No Code Era
          </span>
        </h2>
        <br />
        <Row>
              <Col sm={{ size: 'auto', offset: 1 }} className = {classes.home_button_col}>
                {context.user?.email ? (<Button onClick = {handleLogut} shadow="3" hoverShadow="4" m={{ r: "1rem" }} className = {classes.home_button}>
                  LOGOUT                    
                </Button>) : (<Button onClick = {handleLogin} shadow="3" hoverShadow="4" m={{ r: "1rem" }} className = {classes.home_button}>
                  LOGIN                    
                </Button>)}
                <Anchor href="/visualizer">
                  <Button
                    shadow="3"
                    hoverShadow="4"
                    m={{ r: "1rem" }}
                    className = {classes.home_button}
                  >                   
                    { context.user?.email ? "welocme back " + context.user.email : "Continue as a Guest"}   
                  </Button>
                </Anchor>
                    
                <Anchor href="/aboutus" className = {classes.home_button_link}>                      
                  <Button
                    shadow="3"
                    hoverShadow="4"
                    m={{ r: "1rem" }}
                    className = {classes.home_button}
                    // onClick={addNewNode}
                  >ABOUT US
                  </Button>
                </Anchor>
              </Col>
        </Row>
        <br />
        <h2 className = {classes.home_h2_last_text}>
          Easily convert your Database Diagram to code. Hassle Free.
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}


export default Home;
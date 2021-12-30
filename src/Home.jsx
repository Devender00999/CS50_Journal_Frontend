import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
function Home({ isLoggedIn, setIsLoggedIn, Component }) {
  return (
    <div style={{}}>
      <NavBar isLogined={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container className="homeContainer">
        <Component />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default Home;

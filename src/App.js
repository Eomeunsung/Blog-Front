import logo from './logo.svg';
import './App.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./css/Nav.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import Write from "./routes/Write";
import List from "./routes/List";
import Detail from "./routes/Detail";
import WriteModal from "./routes/WriteModal";

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
        <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand onClick={()=>{navigate("/")}} className="custom-brand" style={{cursor:'pointer'}} >
            MyBlog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate("/")}} className="custom-nav-link">
                Home
              </Nav.Link>
              <Nav.Link onClick={()=>{navigate("/write")}}  className="custom-nav-link">
                Write
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" className="custom-button">
              Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
          <Route path="/" element={<List></List>}/>
          <Route path="/write" element={<Write></Write>}/>
          <Route path="/detail" element={<Detail></Detail>}/>
      </Routes>
    </div>
  );
}

export default App;

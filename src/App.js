
import './App.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./css/Nav.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import List from "./routes/list/List";
import Detail from "./routes/detail/Detail";
import WriteEditor, {mySchema} from './routes/write/WriteEditor'
import Modify from "./routes/modify/Modify";
import ChatRoom from "./routes/ChatRoom";
import { GiTalk } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import ChatRoomList from "./routes/ChatRoomList";

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
                  <IoMdHome />
              </Nav.Link>
              <Nav.Link onClick={()=>{navigate("/write")}}  className="custom-nav-link">
                  <TfiWrite />
              </Nav.Link>
                <Nav.Link onClick={()=>{navigate("/chatRoom")}} className="custom-nav-link">
                    <GiTalk />
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
          <Route path="/write" element={<WriteEditor></WriteEditor>}/>
          <Route path="/detail" element={<Detail></Detail>}/>
          <Route path="/modify" element={<Modify></Modify>}/>
          <Route path="/chatRoom" element={<ChatRoom></ChatRoom>}/>
          <Route path="/room" element={<ChatRoomList></ChatRoomList>}/>
      </Routes>
    </div>
  );
}

export default App;


import './App.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./css/Nav.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import ListPage from "./layouts/list/ListPage";
import DetailPage from "./layouts/detail/DetailPage";
import WritePage, {mySchema} from './layouts/write/WritePage'
import ModifyPage from "./layouts/modify/ModifyPage";
import ChatRoom from "./layouts/ChatRoom";
import { GiTalk } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import ChatRoomList from "./layouts/ChatRoomList";
import SignInPage from "./layouts/users/SignInPage"
import SignUpPage from "./layouts/users/SignUpPage"
import {useEffect, useState} from "react";
import MyProfile from "./layouts/users/MyProfile";

function App() {
  let navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const token  = localStorage.getItem("jwt");
        const name = localStorage.getItem("name");
        if(token){
            setLogin(true);
            setUserInfo({
                name: name,
            })
        }
    }, []);

    const handleLogout =()=>{
        localStorage.removeItem("jwt");
        localStorage.removeItem("name");
        setLogin(false);
        setUserInfo(null);
        navigate("/");
    }

    const handleWirte=()=>{
        const token = localStorage.getItem("jwt");
        if(token){
            navigate("/write");
        }else{
            alert("로그인 후 가능합니다.")
            navigate("/login");
        }
    }

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
              <Nav.Link onClick={()=>{handleWirte()}}  className="custom-nav-link">
                  <TfiWrite />
              </Nav.Link>
                <Nav.Link onClick={()=>{navigate("/chatRoom")}} className="custom-nav-link">
                    <GiTalk />
                </Nav.Link>
            </Nav>
              <Nav>
                  {isLogin ? (
                      <>
                          <Button
                              variant="outline-light"
                              className="custom-button"
                              style={{ marginRight: '10px' }} // 오른쪽에 10px 간격 추가
                              onClick={() => {navigate("/myprofile")}}>
                              {userInfo?.name} {/* 사용자 이름 버튼 */}
                          </Button>
                          <Button
                              variant="outline-light"
                              className="custom-button"
                              onClick={handleLogout}
                              style={{ marginRight: '10px' }} // 오른쪽에 10px 간격 추가
                          >
                              Logout
                          </Button>
                      </>
                  ) : (
                      <>
                          <Button
                              variant="outline-light"
                              className="custom-button"
                              style={{ marginRight: '10px' }} // 오른쪽에 10px 간격 추가
                              onClick={() => navigate("/login")}
                          >
                              SignIn
                          </Button>
                          <Button
                              variant="outline-light"
                              className="custom-button"
                              style={{ marginRight: '10px' }} // 오른쪽에 10px 간격 추가
                              onClick={() => navigate("/signup")}
                          >
                              SignUp
                          </Button>
                      </>
                  )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
          <Route path="/" element={<ListPage></ListPage>}/>
          <Route path="/write" element={<WritePage></WritePage>}/>
          <Route path="/detail" element={<DetailPage></DetailPage>}/>
          <Route path="/modify" element={<ModifyPage></ModifyPage>}/>
          <Route path="/chatRoom" element={<ChatRoom></ChatRoom>}/>
          <Route path="/room" element={<ChatRoomList></ChatRoomList>}/>
          <Route path="/login" element={<SignInPage></SignInPage>}/>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}/>
          <Route path="/myprofile" element={<MyProfile></MyProfile>}/>
      </Routes>
    </div>
  );
}

export default App;


import './App.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./css/Nav.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import ListPage from "./components/list/ListPage";
import DetailPage from "./components/detail/DetailPage";
import WritePage, {mySchema} from './components/write/WritePage'
import ModifyPage from "./components/modify/ModifyPage";
import ChatRoom from "./components/ChatRoom";
import { GiTalk } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import ChatRoomList from "./components/ChatRoomList";
import SignInPage from "./components/users/SignInPage"
import SignUpPage from "./components/users/SignUpPage"
import {useEffect, useState} from "react";
import MyProfile from "./components/users/MyProfile";
import MyProfileUpdateModal from "./components/users/MyProfileUpdateModal";
import FriendPage from "./components/friend/FriendPage";
import { FaUserFriends } from "react-icons/fa";

function App() {
  let navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const name = localStorage.getItem("name");

        if (token) {
            setLogin(true);
            setUserInfo({
                name: name,
            });
        } else {
            setLogin(false);
            setUserInfo(null);
        }

        // localStorage의 변화를 감지하는 이벤트 리스너
        const handleStorageChange = () => {
            const updatedName = localStorage.getItem("name");
            setUserInfo((prevState) => ({
                ...prevState,
                name: updatedName,
            }));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
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

    const handleFriend =()=>{
        const token = localStorage.getItem("jwt");
        if(token){
            navigate("/friend");
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
                <Nav.Link onClick={()=>{handleFriend()}} className="custom-nav-link">
                    <FaUserFriends />
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
          <Route path="/myprofile/update" element={<MyProfileUpdateModal></MyProfileUpdateModal>}/>
          <Route path="/friend" element={<FriendPage></FriendPage>}/>
      </Routes>
    </div>
  );
}

export default App;

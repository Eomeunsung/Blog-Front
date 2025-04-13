
import './App.css';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./css/Nav.css";
import {Routes, Route, useNavigate} from "react-router-dom";
import ListPage from "./components/list/ListPage";
import DetailPage from "./components/detail/DetailPage";
import WritePage from './components/write/WritePage'
import ModifyPage from "./components/modify/ModifyPage";
import ChatRoom from "./components/chat/ChatRoom";
import { GiTalk } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";
import ChatRoomList from "./components/chat/ChatRoomList";
import SignInPage from "./components/users/SignInPage"
import SignUpPage from "./components/users/SignUpPage"
import {useEffect, useState} from "react";
import MyProfile from "./components/users/MyProfile";
import MyProfileUpdateModal from "./components/users/MyProfileUpdateModal";
import FriendPage from "./components/friend/FriendPage";
import { FaUserFriends } from "react-icons/fa";
import RecommendFriendPage from "./components/friend/RecommendFriendPage";
import AdminUserPage from "./components/admin/AdminUserPage";
import AdminLayout from "./components/admin/AdminLayout";
import NavComponent from "./components/NavComponent";
import RolePage from "./components/admin/RolePage";

function App() {


  return (
    <div className="App">
        <NavComponent/>
      <Routes>
          <Route path="/" element={<ListPage></ListPage>}/>
          <Route path="/write" element={<WritePage></WritePage>}/>
          <Route path="/detail" element={<DetailPage></DetailPage>}/>
          <Route path="/modify" element={<ModifyPage></ModifyPage>}/>
          <Route path="/chatRoom" element={<ChatRoomList></ChatRoomList>}/>
          <Route path="/chat" element={<ChatRoom></ChatRoom>}/>
          <Route path="/login" element={<SignInPage></SignInPage>}/>
          <Route path="/signup" element={<SignUpPage></SignUpPage>}/>
          <Route path="/myprofile" element={<MyProfile></MyProfile>}/>
          <Route path="/myprofile/update" element={<MyProfileUpdateModal></MyProfileUpdateModal>}/>
          <Route path="/friend" element={<FriendPage></FriendPage>}/>
          <Route path="/recommendation" element={<RecommendFriendPage></RecommendFriendPage>}/>
          <Route path="/admin" element={<AdminLayout></AdminLayout>}>
              <Route path="users" element={<AdminUserPage></AdminUserPage>}/>
              <Route path="roles" element={<RolePage></RolePage>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;

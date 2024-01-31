import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CreateRoomTab from "../HeaderComponent/CreateRoomTab";
import FastTrackTab from "../HeaderComponent/FastTrackTab";
import RankingTab from "../HeaderComponent/RankingTab";
import SettingTab from "../HeaderComponent/MyPageTab";
import FeedbackTab from "../HeaderComponent/FeedbackTab";
import LogOutTab from "../HeaderComponent/LogOutTab";
import RoomSettingTab from "../HeaderComponent/RoomSettingTab";
import InvitingTab from "../HeaderComponent/InvitingTab";
import LeavingTab from "../HeaderComponent/LeavingTab";
import UseIsLobbyStore from "../../store/UseIsLobbyStore";
import logoImg from "../../asset/image/LOGO.png";

const Header = () => {
  const location = useLocation();
  const [isLobbyPage, setIsLobbyPage] = useState(true);
  const { isLobby, setIsLobby } = UseIsLobbyStore();

  useEffect(() => {
    if (location.pathname === "/lobby") {
      setIsLobbyPage(true);
    } else if (location.pathname.startsWith("/room")) {
      setIsLobbyPage(false);
    }
  }, [location]);

  return (
    <div>
      <nav>
        <ul className="flex flex-row items-end">
          <li>
            <Link to="/lobby">
              <img src={logoImg} alt="Logo" className="h-20" onClick={() => {
        setIsLobby(null);
      }}/>
            </Link>
          </li>
          {isLobbyPage ? (
            <>
              <li>
                <CreateRoomTab />
              </li>
              <li>
                <FastTrackTab />
              </li>
              <li>
                <RankingTab />
              </li>
              <li>
                <SettingTab />
              </li>
              <li>
                <FeedbackTab />
              </li>
              <li>
                <LogOutTab />
              </li>
            </>
          ) : (
            <>
              <li>
                <RoomSettingTab />
              </li>
              <li>
                <InvitingTab />
              </li>
              <li>
                <SettingTab />
              </li>
              <li>
                <LeavingTab />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;

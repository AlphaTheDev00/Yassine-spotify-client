import React, { useState } from "react";
import Navbar from "../NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";
import AlbumGrid from "../AlbumGrid/AlbumGrid";
import "./HomePage.module.css";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="homepage">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="content">
        <Sidebar isLoggedIn={isLoggedIn} />
        <main className="main-page">
          <AlbumGrid />
        </main>
      </div>
    </div>
  );
};

export default HomePage;

import React from "react";
import sidebarStyles from "./Sidebar.module.css";

const Sidebar = ({ isLoggedIn }) => {
  return (
    <aside className={sidebarStyles.sidebar}>
      {isLoggedIn ? (
        <>
          <button className={sidebarStyles.sidebarBtn}>Create Song</button>
          <button className={sidebarStyles.sidebarBtn}>Create Playlist</button>
        </>
      ) : (
        <p className={sidebarStyles.sidebarPlaceholder}>
          Login to create content
        </p>
      )}
    </aside>
  );
};

export default Sidebar;

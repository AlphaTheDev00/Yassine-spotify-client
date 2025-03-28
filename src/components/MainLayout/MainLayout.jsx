import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.mainContainer}>
      <Grid templateColumns="260px 1fr" gap="0" height="100%">
        <GridItem className={styles.sidebarWrapper}>
          <SideBar />
        </GridItem>
        <GridItem className={styles.contentWrapper}>
          <Outlet />
        </GridItem>
      </Grid>
    </div>
  );
}

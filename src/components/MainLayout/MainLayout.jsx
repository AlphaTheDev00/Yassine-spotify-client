import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <Grid templateColumns="3fr 7fr" gap='8px' padding='5px' flexGrow='1'>
            <GridItem borderRadius='16px' padding='16px'>
                <SideBar />
            </GridItem>
            <GridItem borderRadius='16px' padding='16px'>
                <Outlet />
            </GridItem>
        </Grid>
    )
}

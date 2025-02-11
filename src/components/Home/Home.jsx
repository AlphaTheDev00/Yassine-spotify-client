import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { Route, Routes } from "react-router";
import AllSongs from "../AllSongs/AllSongs";
import SingleSong from "../SingleSong/SingleSong";
import CreateSong from "../CreateSong/CreateSong";
import UpdateSong from "../UpdateSong/UpdateSong";

export default function Home() {
    return (
        <Grid templateColumns="repeat(6, 1fr)">
            <GridItem colSpan='6'>
                <NavBar />
            </GridItem>
            <GridItem colSpan='2'>
                <SideBar />
            </GridItem>
            <GridItem colSpan='4'>
                <Routes>
                    <Route path="/" element={<AllSongs />} />
                    <Route path="/songs/new" element={<CreateSong />} />
                    <Route path="/songs/:id" element={<SingleSong />} />
                    <Route path="/songs/:id/update" element={<UpdateSong />} />
                </Routes>
            </GridItem>
        </Grid>
    )
}
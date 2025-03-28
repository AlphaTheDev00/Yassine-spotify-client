import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout/MainLayout";
import Register from "./components/Register/Register";
import AllSongs from "./components/AllSongs/AllSongs";
import CreateSong from "./components/CreateSong/CreateSong";
import SingleSong from "./components/SingleSong/SingleSong";
import UpdateSong from "./components/UpdateSong/UpdateSong";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Playlists from "./components/Playlists/Playlists";
import SinglePlaylist from "./components/SinglePlaylist/SinglePlaylist";
import LikedSongs from "./components/LikedSongs/LikedSongs";
import MusicPictureShowcase from "./components/MusicPicture/MusicPictureShowcase";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<AllSongs />} />
          <Route path="/songs/new" element={<CreateSong />} />
          <Route path="/songs/:id" element={<SingleSong />} />
          <Route path="/songs/:id/update" element={<UpdateSong />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<SinglePlaylist />} />
          <Route path="/liked-songs" element={<LikedSongs />} />
          <Route path="/music-pictures" element={<MusicPictureShowcase />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

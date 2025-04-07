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
import MyPlaylists from "./components/MyPlaylists/MyPlaylists";
import PlaylistDetail from "./components/PlaylistDetail/PlaylistDetail";
import MusicPictureShowcase from "./components/MusicPicture/MusicPictureShowcase";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<AllSongs />} />
          <Route
            path="/songs/new"
            element={
              <ProtectedRoute>
                <CreateSong />
              </ProtectedRoute>
            }
          />
          <Route path="/songs/:id" element={<SingleSong />} />
          <Route
            path="/songs/:id/update"
            element={
              <ProtectedRoute>
                <UpdateSong />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <MyPlaylists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists/:id"
            element={
              <ProtectedRoute>
                <PlaylistDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/liked-songs"
            element={
              <ProtectedRoute>
                <LikedSongs />
              </ProtectedRoute>
            }
          />
          <Route path="/music-pictures" element={<MusicPictureShowcase />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

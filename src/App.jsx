import { Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './components/MainLayout/MainLayout'
import Register from './components/Register/Register'
import AllSongs from './components/AllSongs/AllSongs'
import CreateSong from './components/CreateSong/CreateSong'
import SingleSong from './components/SingleSong/SingleSong'
import UpdateSong from './components/UpdateSong/UpdateSong'
import NavBar from './components/NavBar/NavBar'


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<AllSongs />} />
          <Route path="/songs/new" element={<CreateSong />} />
          <Route path="/songs/:id" element={<SingleSong />} />
          <Route path="/songs/:id/update" element={<UpdateSong />} />
        </Route>
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App

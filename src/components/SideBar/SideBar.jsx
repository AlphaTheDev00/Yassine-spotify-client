import { NavLink } from "react-router";

export default function SideBar () {
    return (
        <>
            <h1>SideBar</h1>
            <NavLink to='/songs/new'>Create Song</NavLink>
        </>
    )
}
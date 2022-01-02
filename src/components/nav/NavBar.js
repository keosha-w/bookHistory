
import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
            <div className="navbar_Div">
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/users">Users</Link>
                    </li>
                </ul>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/myBH">myBookHistory</Link>
                    </li>
                </ul>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/search">Search</Link>
                    </li>
                </ul>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/myTBR">TBR</Link>
                    </li>
                </ul>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/feed">Feed</Link>
                    </li>
                </ul>
                <ul className="navbar">
                    <li className="navbar__item active">
                        <Link className="navbar__link" to="/feed" onClick={
                            () => {
                                localStorage.removeItem("bookHistory_user")
                            }
                        }>Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

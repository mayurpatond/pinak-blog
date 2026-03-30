import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext";


export default function Header() {
    // const [username, setUsername] = useState(null);
    const { setUserInfo, userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                // setUsername(userInfo.username);
                setUserInfo(userInfo)
            })
        })
    }, []);

    function logout() {
        fetch(" http://localhost:4000/logout",
            {
                credentials: 'include',
                method: 'POST'

            }
        )
        setUserInfo(null);
    }
    const username = userInfo?.username
    return (
        <header>
            <div className="brand">
                <Link to="/" className='logo'>Pinak (पिनाक)
                 {/* <img src="/pinak_logo.jpeg" alt="Pinak Logo" className="logo" /> */}
                 </Link>
            </div>
            <div className="copyright">

                © 2026 Mayur Patond's production.This project is for educational purposes only.

            </div>
            <nav>
                {username && (
                    <>
                        <Link to='/create' className="createpost">Create New Post</Link>
                        <Link onClick={logout} className="logout">Logout</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to='/login' className='login'>Login</Link>
                        <Link to='/register'> Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

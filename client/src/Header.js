
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { API_URL } from "./config";


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setMenuOpen(false);
  }

  const username = userInfo?.username;

  return (
    <header className="header">
      <div className="brand">
        <Link to="/" className="logo-bg">
          Pinak's (पिनाक)
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        {username ? (
          <>
            <Link to="/create" onClick={() => setMenuOpen(false)}>
              Create New Post
            </Link>
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        )}
      </nav>

      <div className="copyright">
        © 2026 Mayur Patond's production. Educational project.
      </div>
    </header>
  );
}











// import { Link } from "react-router-dom"
// import { useContext, useEffect, useState } from "react"
// import { UserContext } from "./UserContext";


// export default function Header() {
//     // const [username, setUsername] = useState(null);
//     const { setUserInfo, userInfo } = useContext(UserContext)
//     useEffect(() => {
//         fetch('http://localhost:4000/profile', {
//             credentials: "include",
//         }).then(response => {
//             response.json().then(userInfo => {
//                 // setUsername(userInfo.username);
//                 setUserInfo(userInfo)
//             })
//         })
//     }, []);

//     function logout() {
//         fetch(" http://localhost:4000/logout",
//             {
//                 credentials: 'include',
//                 method: 'POST'

//             }
//         )
//         setUserInfo(null);
//     }
//     const username = userInfo?.username
//     return (
//         <header>
//             <div className="brand">
//                 <Link to="/" className='logo'>Pinak (पिनाक)
//                  {/* <img src="/pinak_logo.jpeg" alt="Pinak Logo" className="logo" /> */}
//                  </Link>
//             </div>
//             <div className="copyright">

//                 © 2026 Mayur Patond's production.This project is for educational purposes only.

//             </div>
//             <nav>
//                 {username && (
//                     <>
//                         <Link to='/create' className="createpost">Create New Post</Link>
//                         <Link onClick={logout} className="logout">Logout</Link>
//                     </>
//                 )}
//                 {!username && (
//                     <>
//                         <Link to='/login' className='login'>Login</Link>
//                         <Link to='/register'> Register</Link>
//                     </>
//                 )}
//             </nav>
//         </header>
//     )
// }

import { useState } from "react"
import { API_URL } from "../config";


export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    async function register(ev) {
        ev.preventDefault();
       const response= await fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.status===400) {
            alert('Username and password are required')
        };

        if (response.status===201) {
            alert('Registration Successful, Please Login Now...');
        }
        else{
            alert('Registration Failed, username may already present in DB, try using different username to register...')
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>
        </form>
    )
}
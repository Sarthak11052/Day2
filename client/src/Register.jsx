import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);


    async function register(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/register', { username, password });
        setLoggedInUsername(username);
        setId(data.id);
    }


    // async function register(ev) {
    //     ev.preventDefault();
    //     const { data } = await axios.post('/register', { username, password });
    //     try {
    //         const { data } = await axios.post('http://localhost:4040/register', { username, password });
    //         console.log('Registration response:', data);
    //         setLoggedInUsername(username);
    //         setId(data.id);
    //     } catch (error) {
    //         console.error('Registration error:', error);
    //     }
    // }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto  mb-12" onSubmit={register}>
                <input value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    type='text' placeholder='username' className="block w-full rounded-sm p-2 mb-2 border"></input>
                <input type='password' value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    placeholder='password' className="block w-full rounded-sm p-2 mb-2 border"></input>
                <button type="submit" className="bg-blue-500  text-white p-2 rounded w-full">
                    Register
                </button>
            </form>
        </div>
    );
}
export default Register;
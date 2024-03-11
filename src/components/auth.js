import { auth, googleProvider } from "../config/firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import {useState} from "react";
export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error)
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error)
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <form>
            <input
                className='unselectable'
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='unselectable'
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='unselectable' onClick={signIn}>Sign In</button>
            <button className='unselectable' onClick={signInWithGoogle}>Sign In With Google</button>
            <button className='unselectable' onClick={logout}>Logout</button>
        </form>
    );
};
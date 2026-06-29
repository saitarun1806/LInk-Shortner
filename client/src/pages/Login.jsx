import { useState } from "react";
import {Link,useNavigate,useNavigation} from "react-router-dom";
import axios from "axios";
import "./Login.css"

function Login(){
    const navigate = useNavigate();
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [loading,setLoading]=useState(false);
    
    const handleLogin = async(e) =>{
        e.preventDefault();
        
        try{
            setLoading(true);
            const {data} = await axios.post(
                "http://localhost:5000/api/v1/auth/login",
                {
                    email,
                    password,
                }
            );
            
            localStorage.setItem("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));
            
            

            navigate("/dashboard");
        }catch(err){
            alert(err.response?.data?.message || "Login Failed");
        }finally{
            setLoading(false);
        }
    };
    return (
    <div className="login-container">
        <div className="login-card">

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="login-btn"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging In..." : "Login"}
                </button>

            </form>

            <p className="register-link">
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>
    </div>
);
    
}

export default Login;
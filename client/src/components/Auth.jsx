import React, {useState} from "react"
import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies()

const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form)
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {username, password, confirmPassword} = form
        if(password.length < 8) {  
            document.getElementById("message").innerHTML = "**Password length must be at least 8 characters";  
            return;  
         }  
        if(isSignup && password !== confirmPassword){
            document.getElementById("message").innerHTML = "**Passwords do not match";
            return;
        }
        const URL = "http://localhost:5000/auth";
        const {data: {token, userId, hashedPassword,}} = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {username, password,})
        cookies.set("token", token)
        cookies.set("username", username)
        cookies.set("userId", userId)
        if(isSignup){
            cookies.set("hashedPassword", hashedPassword)
        }
        window.location.reload()
        console.log(form)
    }

    return (
    <div className = "authFrom">
        <div className = "authFormFields">
            <div className = "authFormFieldsContent">
            <center>
                {isSignup ? "Signup" : "Sign In"}
            </center>
            <form onSubmit = {handleSubmit}>
                <div className = "authFormFieldsContentI">
                        <label htmlFor = "username">
                            UserName
                        </label>
                        <input 
                            name = "username"
                            type = "text"
                            placeholder = "Username"
                            onChange = {handleChange}
                            required
                        />
                    </div>
                <div className = "authFormFieldsContentI">
                        <label htmlFor = "password">
                            Password
                        </label>
                        <input 
                            name = "password"
                            type = "password"
                            placeholder = "Password"
                            onChange = {handleChange}
                            required
                        />
                </div>
                <center id = "message" className = "authMessage"> </center> <br/> 
                {isSignup && (
                    <div className = "authFormFieldsContentI">
                        <label htmlFor = "password">
                            Confirm Password
                        </label>
                        <input 
                            name = "confirmPassword"
                            type = "password"
                            placeholder = "Confirm Password"
                            onChange = {handleChange}
                            required
                        />
                </div>
                )}
                <div className = "authFormFieldsContentB">
                    <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                </div>
            </form>
            <div className = "authFormFieldsChange">
                <center>
                    {isSignup ? "Already signed up?" : "Don't have an account?"}
                    <p className = "authFromFieldsSwitch" onClick = {switchMode}>
                        {isSignup ? "Sign In Instead" : "Sign Up Instead"}
                    </p>
                </center>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Auth
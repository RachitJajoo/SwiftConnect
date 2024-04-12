import { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import "../index.css";
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIroutes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Login(){

    const navigate = useNavigate();
    const isUserLogged = async() =>{
      if(localStorage.getItem('chat-app-user')){
        navigate("/");
      }
    };

    useEffect(()=>{
      isUserLogged();
    },[]);


    const [formlabel , setformlabel] = useState({
        username : "",
        password : "",
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const handleChange = (event) => {
        setformlabel((prevFormLabel) => ({
          ...prevFormLabel,
          [event.target.name]: event.target.value,
        }));
    };
   
    const validateForm = () => {
        const { username, password } = formlabel;
        if (username === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        } else if (password === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        }
        return true;
      };

      const handleSubmit = async (event)=>{
        event.preventDefault();
        if(validateForm()){
          const { username , password } = formlabel;
          const {data} = await axios.post(loginRoute , {
              username , password,
          });
          if(data.status === false){
              toast.error(data.msg , toastOptions);
          }
          if(data.status === true){
              localStorage.setItem("chat-app-user" , JSON.stringify(data.user));
              navigate("/");
          }  
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return(
        <>
        <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>SwiftConnect</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              style={{ paddingRight: '30px' }}
              required 
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>
          <span>Dont have an account ? 
            <Link to={'/register'}> Register!</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
      </>
    )
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4r em;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
  .password-input {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
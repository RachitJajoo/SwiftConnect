import { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from "../assets/loader.gif";
import "../index.css";
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';  
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIroutes';


export default function SetAvatar(){

  



  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();


  const isUserLogged = async() =>{
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
  };
  useEffect(()=>{
    isUserLogged();
  },[]);

  const [avatars , Setavatars] = useState([]); // Avatars contains the choices of the avatars that the api call will provide with 
  //refresh these avatar options change due to a random call to the api 
  const [isloading , setIsLoading] = useState(true);
  // isloading is useful to shoe the loader on the screen while the api is busy in fetching the avata options
  const [selectedAvatar , setSelectedAvatar] = useState(undefined);
  // setAvatar while choose the avatar that you pick and display it as your avatar in the chat

  const setProfilePicutre = async()=>{
    if(selectedAvatar === undefined){
      toast.error('Please Choose an Avatar',toastOptions);
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}` , {image : avatars[selectedAvatar]}); 
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user" , JSON.stringify(user));
        navigate("/");
      }else {
        toast.error(data.msg, toastOptions);
      }
    }
    
  };
  const f = async()=>    
  {
    try{const data = [];
    for (let i = 0; i < 2; i++) {
      const num = Math.round(Math.random() * 1000) + 1;
      const response = await axios.get(`${api}/${num}`);
      const buffer = new Buffer(response.data);
      data.push(buffer.toString('base64'));
    }
    Setavatars(data);
    setIsLoading(false);}
    catch(err){
      toast.error(err.msg , toastOptions);
    }
  };
  useEffect(() => {
        f();
        return setIsLoading(true);
  }, []);
  return (
    <> 
    <Container>
        {
          isloading ? (
            <img src={loader} alt="loader" />
          )
          :
          (
            <>
            <div className="title">
            <h1>Pick an Avatar as your profile picture.</h1>
            </div>
            <div className="avatars">{
              avatars.map((avatar , index ) =>{
                return(
                  <div
                  key = {index} 
                  className ={`avatar ${selectedAvatar === index ? "selected" : ""}`}    >  
                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="" onClick={()=>setSelectedAvatar(index)}   />

                  </div>
                  )
                })
              }
            </div>
            <div className="btn">
              <button className='submit-btn' onClick={setProfilePicutre}>Set as Profile Picture</button>
            </div>
            </>
          )
        }
        
      </Container> 
      <ToastContainer />
    </>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding : 0.6rem;
      margin-left : 1rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  button {
    width : 100%;
    margin : 1rem;
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

`;

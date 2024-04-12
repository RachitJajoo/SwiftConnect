import styled from 'styled-components';
import { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import { getAllUsers , host} from '../utils/APIroutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import loader from '../assets/loader.gif'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';


export default function Chat(){
    const socket  = useRef();
    const navigate = useNavigate();
    const [currentChat , setCurrentChat] = useState(undefined);
    const [currentUser , setcurrentUser] = useState(undefined);
    const [contacts , setcontacts] = useState([]);
    useEffect(()=>{
        const isUserLogged = async() =>{
            if(!localStorage.getItem('chat-app-user')){
              navigate("/login");
            }else{
                setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
            }
        };    
        isUserLogged();
        
    },[]);
    useEffect(() => {
      const newSocket = io('https://swiftconnect.onrender.com');
      socket.current = newSocket;
    
      return () => {
        newSocket.disconnect();
      };
    }, []);
    
    useEffect(() => {
      if (currentUser && socket.current) {
        socket.current.emit("add-user", currentUser._id);
      }
    }, [currentUser]);
    
   

    useEffect(()=>{
        const getcontacts= async()=>{
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const allcontancts = await axios.get(`${getAllUsers}/${currentUser._id}`);
                    setcontacts(allcontancts.data.data);
       
                }else{
                    navigate("/setavatar");
                }
            }

        }
        getcontacts();
        
    },[currentUser]);
    
    
    
    const handleChatChange = (chat)=>{
      setCurrentChat(chat);
    }

    return (
        <>
          <Container>
            <div className="container">
                  <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange} ></Contacts>
                {
                  currentChat === undefined ? 
                  <Welcome /> 
                  : 
                  <ChatContainer currentChat={currentChat}  currentUser={currentUser} socket={socket}/>
                }
            </div>
          </Container>
        </>
      );
    }
    
    const Container = styled.div`
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      background-color: #131324;
      .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          grid-template-columns: 35% 65%;
        }
      }
    `;

import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {ChannelContainer, ChannelListContainer, Auth} from './components';
import './App.css';

const cookies = new Cookies()
const apiKey = 'njj9dy56h7fs';
const authToken = cookies.get('token');
const client = StreamChat.getInstance(apiKey);
if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken)
}


const App = () => {
  if(!authToken) return <Auth />
  return (
    <div className="app_warpper">
        <Chat client={client} theme="team light">
            <ChannelListContainer 
            
            />
            <ChannelContainer 
            
            />
        </Chat>
    </div>
  );
}

export default App;
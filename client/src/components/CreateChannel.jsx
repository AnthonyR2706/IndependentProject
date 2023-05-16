import React, {useState} from "react"
import {useChatContext} from "stream-chat-react"
import {UserList} from "./"
import {CloseCreateChannel} from "../assets/CloseCreateChannel.js"

const ChannelNameInput = ({channelName = '', setChannelName}) => {
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  }
  return(
    <div className = "channelNameInput">
      <p>Name</p>
      <input value = {channelName} onChange = {handleChange} placeholder = "channel-name" />
      <p>Add members</p>
    </div>
  )
}

const CreateChannel = ({createType, setIsCreating}) => {
  const {client, setActiveChannel} = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
  const [channelName, setChannelName] = useState('');
  
  const createChannel = async (e) => {
    e.preventDefault();
    try{
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });
      await newChannel.watch();
      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className = "createChannel"> 
        <div className = "createChannelHeader">
          <p>
            {createType === "team" ? "Create a new channel" : "Send direct message"}
          </p>
          <CloseCreateChannel setIsCreating = {setIsCreating} />
        </div>
        {createType === "team" && <ChannelNameInput channelName = {channelName} setChannelName = {setChannelName} />}
      <UserList setSelectedUsers = {setSelectedUsers} />
      <div className = "createChannelB" onClick = {createChannel}>
        <p>{createType === "team" ? "Create Channel" : "Create Message group"}</p>
      </div>
    </div>
  )
}

export default CreateChannel
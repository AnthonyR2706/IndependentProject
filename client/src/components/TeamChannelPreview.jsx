import React from "react"
import { Avatar, useChatContext } from "stream-chat-react"

const TeamChannelPreview = ({channel, type, setToggleContainer, setIsCreating, setActiveChannel, setIsEditing}) => {
    const {channel: activeChannel, client} = useChatContext();
    const ChannelPreview = () => (
        <p className = "channelPreview">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );
   
    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID)
        return (
            <div className = "channelPreview single">
                <Avatar 
                    image = {members[0]?.user?.image}
                    name = {members[0]?.user?.name || members[0]?.user?.id}
                    size = {32}
                >
                </Avatar>
                <p>
                    {members[0]?.user?.name || members[0]?.user?.id}
                </p>
        
            </div>
          )
    }
    return (
        <div className = {channel?.id === activeChannel?.id 
            ? "channelPreviewSelected"
            : "channelPreviewWrapper"
            }
            onClick = {() => {
                setIsCreating(false);
                setIsEditing(false);
                setActiveChannel(channel);
                if(setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)
                }
            }}
            >
                {type === "team" ? <ChannelPreview /> : <DirectPreview/>}
        </div>
    );
  
}

export default TeamChannelPreview
import React from "react";
import {Channel, MessageSimple} from "stream-chat-react";
import {ChannelInner, CreateChannel, EditChannel} from "./";

const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType,}) => {
  if(isCreating){
    return(
      <div className = "channel">
        <CreateChannel createType = {createType} setIsCreating = {setIsCreating} />
      </div>
    )
  }
  if(isEditing){
    return(
      <div className = "channel">
        <EditChannel setIsEditing = {setIsEditing} />
      </div>
    )
  }
  const EmptyState = () => {
    <div className = "channelEmpty">
      <p className = "channelEmpty1">
        This is the start of your chat history
      </p>
      <p className = "channelEmpty2">
        Send messages, attachments, links, emojis and more
      </p>
    </div>
  }

  return (
    <div className = "channel">
        <Channel
          EmptyStateIndicator = {EmptyState}
          Message = {(messageProps, i) => <MessageSimple key = {i} {...messageProps} />}
        >
          <ChannelInner setIsEditing = {setIsEditing} />
        </Channel>
    </div>
  );
}

export default ChannelContainer
import React from "react"
import {AddChannel} from "../assets/AddChannel.js";

const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    if(error){
        return type === "team" ? (
            <div className = "teamChannelList">
                <p className = "teamChannelListMessage">
                    Wait
                </p>
            </div>
        ) : null
    }
    if(loading){
        return(
            <div className = "teamChannelList">
            <p className = "teamChannelListMessage loading">
                {type === "team" ? "Channels" : "Messages"} loading...
            </p>
        </div> 
        )
    }
  return (
    <div className = "teamChannelList">
        <div className = "teamChannelListHeader">
            <p className = "teamChannelListName">
                {type === "team" ? "Channels" : "Direct Messages"}
            </p>
            <AddChannel
                isCreating = {isCreating}
                setIsCreating = {setIsCreating}
                setCreateType = {setCreateType}
                setIsEditing = {setIsEditing}
                type = {type === "team" ? "team" : "messaging"}
                setToggleContainer = {setToggleContainer}
            />
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList
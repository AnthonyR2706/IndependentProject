import React from "react";
import{ChannelList, useChatContext} from "stream-chat-react";
import{ChannelSearch, TeamChannelList, TeamChannelPreview} from "./";
import Cookies from "universal-cookie";
import icon2 from "../assets/icon2.png";

const cookies = new Cookies();

const SideBar = ({logout}) => (
    <div className = "channelListSidebar">
        
        
    </div>
)

const CompanyHeader = ({logout}) => (
    <>
    <div className = "channelListHeader">
        <p className = "channelListHeaderText">
            Chat Program
        </p>
        
    </div>
    <div className = "channelListSidebarImj2">
        <div className = "imj2" onClick = {logout}>
        <img src = {icon2} alt = "icon2" width = "30"></img>
        </div>
        <p className = "channelListSidebarImj2Text">Log Out</p>
    </div>
    </>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team");
}
const customChannelMessageingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging");
}

const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
    const {client} = useChatContext();
    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("username");
        cookies.remove("hashedPassword");
        window.location.reload();
    }
    const filters = {members : {$in: [client.userID]}};
    return (
    <>
        <div className = "channelListWrapper">
            <CompanyHeader logout = {logout}/>
            <ChannelSearch setToggleContainer = {setToggleContainer}/>
            <ChannelList 
                filters = {filters}
                channelRenderFilterFn = {customChannelTeamFilter}
                List = {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type = "team"
                        isCreating = {isCreating}
                        setIsCreating = {setIsCreating}
                        setCreateType = {setCreateType}
                        setIsEditing = {setIsEditing}
                        setToggleContainer = {setToggleContainer}
                    >
                    </TeamChannelList>)}
                    Preview = {(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating = {setIsCreating}
                            setIsEditing = {setIsEditing}
                            setToggleContainer = {setToggleContainer}
                            type = "team"
                            >
                        </TeamChannelPreview>
                    )} 
            />
            <ChannelList 
                filters = {filters}
                channelRenderFilterFn = {customChannelMessageingFilter}
                List = {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type = "messaging"
                        isCreating = {isCreating}
                        setIsCreating = {setIsCreating}
                        setCreateType = {setCreateType}
                        setIsEditing = {setIsEditing}
                        setToggleContainer = {setToggleContainer}
                    />
                    )}
                    Preview = {(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating = {setIsCreating}
                            setIsEditing = {setIsEditing}
                            setToggleContainer = {setToggleContainer}
                            type = "messaging"
                            />
                    )} 
            />
        </div>
    </>
  );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    return (
        <>
            <div className="channelListContainer">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>
        </>
    )

}


export default ChannelListContainer
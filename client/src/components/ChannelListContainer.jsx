import React from 'react';
import{ChannelList, useChatContext} from 'stream-chat-react';
import{ChannelSearch, TeamChannelList, TeamChannelPreview} from './';
import Cookies from 'universal-cookie';
import icon1 from '../assets/icon.png';
import icon2 from '../assets/icon2.jpg';

const SideBar = () => (
    <div className = "channel-list_sidebar">
        <div className = "channel-list_sidebar_icon1">
            <div className = "icon1_inner">
                <img  alt = "icon1" width = "30"></img>
            </div>
        </div>
        <div className = "channel-list_sidebar_icon2">
            <div className = "icon2_inner">
                <img  alt = "icon2" width = "30"></img>
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className = "channel-list_header">
        <p className = "channel-list_header_text">
            Chat Program
        </p>
    </div>
)

const ChannelListContainer = () => {
  return (
    <>
        <SideBar></SideBar>
        <div className = "channel-list_list_wrapper">
            <CompanyHeader></CompanyHeader>
            <ChannelSearch></ChannelSearch>
            <ChannelList 
                filters = {{}}
                channelRenderFilterFn = {() => {}}
                List = {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type = 'team'
                    >
                    </TeamChannelList>)}
                    Preview = {(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type = 'team'
                            >
                        </TeamChannelPreview>
                    )} 
            ></ChannelList>
            <ChannelList 
                filters = {{}}
                channelRenderFilterFn = {() => {}}
                List = {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type = 'messaging'
                    >
                    </TeamChannelList>)}
                    Preview = {(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type = 'messaging'
                            >
                        </TeamChannelPreview>
                    )} 
            ></ChannelList>
        </div>
    </>
  );
}

export default ChannelListContainer
import React from 'react'
import {AddChannel} from '../assets/AddChannel.js';

const TeamChannelList = ({children, error = false, loading, type}) => {
    if(error){
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list_message'>
                    Wait
                </p>
            </div>
        ) : null
    }
    if(loading){
        return(
            <div className='team-channel-list'>
            <p className='team-channel-list_message loading'>
                {type === 'team' ? 'Channels' : 'Messages'} loading...
            </p>
        </div> 
        )
    }
  return (
    <div className='tean-channel-list'>
        <div className='team-channel-list_header'>
            <p className='team-channel-list_header_title'>
                {type === 'team' ? 'Channels' : 'Direct Messages'}
            </p>
            {/* Button add channel */}
        </div>
        {children}
    </div>
  )
}

export default TeamChannelList
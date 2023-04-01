import React, {useState, useEffect} from 'react';
import { useChatContext } from 'stream-chat-react';
import {SearchIcon} from '../assets/SearchIcon.js';

const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [LoadingChannels, setLoading] = useState(false);
    const getChannels = async (text) => {
        try {
            // TODO: fetch channels
        } catch (error) {
            setQuery('')
        }
    }
    const onSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        setQuery(event.target.value);
        getChannels(event.target.value);
    }
    return (
        <div className = "channel-search_container">
            <div className = "channel-search_input_wrapper">
                <div className = "channel-search_input_icon">
                    <SearchIcon></SearchIcon>
                </div>
                <input className = "channel-_input_text" 
                placeholder = "Search"
                type = "text"
                value = {query}
                onChange = {onSearch}>
                </input>
            </div>
        </div>
    )
}

export default ChannelSearch
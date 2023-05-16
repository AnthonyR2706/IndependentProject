import React, {useEffect, useState} from "react"
import {Avatar, useChatContext} from "stream-chat-react"
import {InviteIcon} from '../assets/InviteIcon.js'

const ListContainer = ({children}) => {
    return (
        <div className = "userList">
            <div className = "userListHeader">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}
const UserItem = ({user, setSelectedUsers}) => {
    const [selected, setSelected] = useState(false)
    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected)
    }
    return (
        <div className = "userItem" onClick = {handleSelect}>
            <div classname = "userItemNameW">
                <Avatar image = {user.image} name = {user.name || "test"} size = {32}/>
                <p className = "userItemName">{user.name || user.id}</p>
            </div>
        {selected ? <InviteIcon /> : <div className = 'userItemEmpty' />}
        </div>
    )
}

const UserList = ({setSelectedUsers}) => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;
            setLoading(true);
            try{
                const response = await client.queryUsers(
                    {id: {$ne: client.userID}},
                    {id: 1},
                )
                if(response.users.length){
                    const sortedUsers = response.users.sort((a, b) => a.name.localeCompare(b.name));
                    setUsers(sortedUsers);
                } else{
                    setListEmpty(true);
                }
            } catch (error){
                setError(true);
            }
            setLoading(false)
        }
        if(client) getUsers()
    }, [])
    if(error){
        return (
            <ListContainer>
                <div classname = "userlistMessage">
                    Error, refresh
                </div>
            </ListContainer>
        )
    }
    if(listEmpty){
        return (
            <ListContainer>
                <div classname = "userlistMessage">
                    No users found
                </div>
            </ListContainer>
        )
    }
    return (
        <div className="scrollableContainer">
        <ListContainer>
            {loading ? <div className = "userlistMessage">
                loading users
            </div> : (
                users?.map((user, i) => (
                <UserItem 
                index = {i} 
                key = {user.id} 
                user = {user} 
                setSelectedUsers = {setSelectedUsers}/>
            ))
        )}
        </ListContainer>
        </div>
    )
}
export default UserList
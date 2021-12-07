import React, { useEffect, useState } from "react";

export const UsersList = () => {

    const [users, setUsers] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/users")
                .then(res => res.json())
                .then((data) => {
                    setUsers(data)
                })
        },
        []
    )

    return (
        <>
            {
                users.map(
                    (userObj) => {
                        return <p key="user--${userOnj.id}">{userObj.name}</p>
                    }
                )
            }
        </>
    )
}



import { Route } from "react-router-dom"
import { UsersList } from "./components/users/Users"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
            <UsersList />
            </Route>
        </>
    )
}

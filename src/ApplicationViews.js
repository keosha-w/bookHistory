

import { Route } from "react-router-dom"
import { BookData, DataFromAPI } from "./components/Data/GoogleAPI"
import { UsersList } from "./components/users/Users"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/users">
            <UsersList />
            </Route>
            <Route path="/search">
            <BookData />
            </Route>
            
        </>
    )
}



import { Route } from "react-router-dom"
import { BookForm } from "./components/books/BookForm"
import { BookList } from "./components/books/BookList"
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
            <Route path="/myBH">
            <BookList />
            </Route>
            
        </>
    )
}

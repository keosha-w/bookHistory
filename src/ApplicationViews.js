

import { Route } from "react-router-dom"
import Book from "./components/books/Book"
import { BookForm } from "./components/books/BookForm"
import { BookList } from "./components/books/BookList"
import { EditBook } from "./components/books/EditBook"
import { TBRList } from "./components/tbr/TBRList"
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
            <Route exact path="/myBH">
            <BookList />
            </Route>
            <Route exact path="/myBH/book:bookId(\d+)">
            <Book />
            </Route>
            <Route exact path="/myBH/book/:edit:bookId(\d+)">
            <EditBook />
            </Route>
            <Route exact path="/myTBR">
            <TBRList />
            </Route>
            <Route path="/form">
            <BookForm />
            </Route>
            
        </>
    )
}

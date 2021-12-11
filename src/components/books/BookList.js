import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Book from "./Book"
import { Link } from "react-router-dom";


export const BookList = () => {
    const [books, setBooks] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/history?_expand=book`)
                .then(res => res.json())
                .then((booksArray) => {
                    setBooks(booksArray)
                })
        }, []
        )

    const foundUsersHistory = books.filter((book) => book.userId === parseInt(localStorage.getItem("bookHistory_user")))
 
    return(
        <>
            {
                foundUsersHistory.map((book) => <Link to={`/myBH/book${book.id}`}><Book  key={book.id} book={book}/></Link>)
            }
        </>
    )

}
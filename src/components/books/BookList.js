import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Book from "./Book"
import { Link } from "react-router-dom";


export const BookList = () => {
    const [books, setBooks] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/books`)
                .then(res => res.json())
                .then((booksArray) => {
                    setBooks(booksArray)
                })
        }, []
        )

    return(
        <>
            {
                books.map((book) => <Link to={`/myBH/book${book.id}`}><Book  key={book.id} book={book}/></Link>)
            }
        </>
    )

}
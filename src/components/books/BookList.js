import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Book from "./Book"


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
                books.map((book) => <Book  key={book.id} book={book}/>)
            }
        </>
    )

}
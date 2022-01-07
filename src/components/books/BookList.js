import "./bookList.css"
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Book from "./Book"
import { Link } from "react-router-dom";

//Responsibility - BookHistory list. This component handles the logged in user's bookHistory and renders it to the page. 


export const BookList = () => {
    const [books, setBooks] = useState([])
    const [foundUsersHistory, setFoundUserHistory] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/history?_expand=book`)
                .then(res => res.json())
                .then((booksArray) => {
                    setBooks(booksArray)
                })
            
        }, []
        )

        useEffect(
            () => {
                setFoundUserHistory(books.filter((book) => book.userId === parseInt(localStorage.getItem("bookHistory_user"))))
            },[books]
        )


    return(
        <>
            {
                foundUsersHistory.map((book) => <Link to={`/myBH/book${book.id}`}><Book className="book__Item" key={book.id} book={book}/></Link>)
            }
        </>
    )

}
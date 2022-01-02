
import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Book from "../books/Book"
import { Link } from "react-router-dom";

//Responsibility - BookHistory list. This component handles the logged in user's bookHistory and renders it to the page. 


export const TBRList = () => {
    const [books, setBooks] = useState([])
    const [foundUsersHistory, setFoundUserHistory] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/tbr?_expand=book`)
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
                foundUsersHistory.map((book) => <Book  key={book.id} book={book}/>)
            }
        </>
    )

}
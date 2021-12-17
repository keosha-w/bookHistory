import "./book.css"
import { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { BookList } from "./BookList"


//Responsibility - Single book view. Whenever a single book is rendered to the page this component handles the data. 
export default ({book}) => {
    const history = useHistory()
    const { bookId } = useParams()
    const [details, setDetails] = useState(false) //boolean value that changes depending on if details page is rendering or not. 
    const [currentBook, setCurrentBook] = useState({})
    

        const fetchBooks = () => {
            fetch(`http://localhost:8088/books/${bookId}`)
                .then(res => res.json())
                .then((book) => {
                    setCurrentBook(book)
                })
        }

    useEffect(() => {
        if (bookId) {
            setDetails(true)
            fetchBooks()
        }
    }, [])

   
    
    const deleteBook = () => { //delete book functionality which deletes the book from the user's history. 
        fetch(`http://localhost:8088/history/${bookId}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            history.push("/myBH")
        })
    }

    return(
        <>
            <h3></h3>
            { details

                ? <><h4>{currentBook?.name} by {currentBook?.author}</h4>
                <p>{currentBook.description}</p>
                <button onClick={() => {
                    history.push(`/myBH/book/edit${bookId}`)}
                }>Edit</button>
                <button onClick={deleteBook}>Delete</button>
                </>
                : <h4>{book?.book.name} by {book?.book.author}</h4>
            }
        </>
    )
}


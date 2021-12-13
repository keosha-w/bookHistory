import { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"
import { BookList } from "./BookList"

export default ({book}) => {
    const history = useHistory()
    const { bookId } = useParams()
    const [details, setDetails] = useState(false)
    const [currentBook, setCurrentBook] = useState({})
    

    useEffect(
        () => {
            fetchBooks()
        }, []
        )

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
        }
    }, [])

   
    const updateBook = (book) => {
        return fetch(`http://localhost:8088/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        .then(fetchBooks())
    }
    
    const deleteBook = () => {
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


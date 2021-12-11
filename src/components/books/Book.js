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
            fetch(`http://localhost:8088/books/${bookId}`)
                .then(res => res.json())
                .then((book) => {
                    setCurrentBook(book)
                })
        }, []
        )

    useEffect(() => {
        if (bookId) {
            setDetails(true)
        }
    }, [])

   

    
    const deleteBook = () => {
        fetch(`http://localhost:8088/books${bookId}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(() => {
            history.pushState("/myBH")
        })
    }

    return(
        <>
            { details

                ? <h4>{currentBook?.name} by {currentBook?.author}</h4>
                : <h4>{book?.name} by {book?.author}</h4>
            }
        </>
    )
}


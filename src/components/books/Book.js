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
    const [bookHistory, setBookHistory] = useState([])
    const [currentHistory, setCurrentHistory] = useState({})
    

        const fetchBooks = () => {
            fetch(`http://localhost:8088/history/${bookId}/?_expand=book`)
                .then(res => res.json())
                .then((book) => {
                    setCurrentBook(book)
                })
                .then(fetch(`http://localhost:8088/history`)
                .then(res => res.json())
                .then((history) => {
                setBookHistory(history)
            })
                )
    
        }

    useEffect(() => {
        if (bookId) {
            setDetails(true)
            fetchBooks()
        }
    }, [])



    useEffect(() => {
        
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

                ? <><div className="bookDetails">
                    <img className="bookDetails__Image"src={currentBook?.book?.image}></img>
                    <h4 className="bookDetails__TitleAuthor">{currentBook?.book?.name} by {currentBook?.book?.author}</h4>
                    <p className="bookDetails__Description">{currentBook?.book?.description}</p>
                    <h4>Date Started:</h4><p>{currentBook.dateStarted}</p>
                    <h4>Date Completed:</h4><p>{currentBook.dateCompleted}</p>
                    <h4>myEntry:</h4><p>{currentBook.entry}</p>
                    <h4>Marked for re-read?</h4><p>{currentBook.reRead}</p>
                    <button className="bookDetails__Button" onClick={() => {
                        history.push(`/myBH/book/edit${bookId}`)}
                    }>Edit</button>
                    <button className="bookDetails__Button" onClick={deleteBook}>Delete</button>
                </div>
                </>
                : <div className="book">
                    <h4>{book?.book?.name} by {book?.book?.author}</h4>
                </div>
            }
        </>
    )
}


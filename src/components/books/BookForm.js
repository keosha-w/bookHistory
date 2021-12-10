import { useEffect } from "react"
import { useHistory } from "react-router"
import { useState } from "react/cjs/react.development"


export const BookForm = ({updateSelectedBook, selectedBook}) => {
    const [books, setBooks] = useState()
    
    const [createdBHObj, setCreatedBHObj] = useState({
        userId: 0,
        bookId: 0, 
        dateStarted: "",
        dateCompleted: "",
        entry: "",
        reRead: false

    })
    
    const history = useHistory()
    useEffect(
        () => {
            fetch(`http://localhost:8088/books`)
            .then(res => res.json())
            .then((booksArray) => {
                setBooks(booksArray)
            })
        },[]
    )
    
    const findSelectedBook = () => {
        const foundBook = books.find((book) => {
            if (book.apiBookId === selectedBook.apiBookId) {
                return book.id
            }
        })
        return foundBook.id
    }

    const createBookHistoryObject = (event) => {
        event.preventDefault()
        const newHistory = {
            userId: parseInt(localStorage.getItem("bookHistory_user")),
            bookId: findSelectedBook(),
            dateStarted: createdBHObj.dateStarted,
            dateCompleted: createdBHObj.dateCompleted,
            entry: createdBHObj.entry, 
            reRead: createdBHObj.reRead
        }
        const fetchOptions = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHistory)
        } 
        return fetch(`http://localhost:8088/history`, fetchOptions)
            .then(() => {
                history.push("/myBH")
            })

    }

    return(
        <form className="bookToHistory__Form">
            <h2>Add info to your history</h2>
            <div className="form-group">
                <label htmlFor="dateStarted">Date Started</label>
                <input
                    type="date"
                    required
                    autoFocus
                    className="form-control"
                    id="dateStarted"
                    placeholder="When did you start reading?"
                    onChange={
                        (event) => {
                            const copy = {...createdBHObj}
                            copy.dateStarted = event.target.value
                            setCreatedBHObj(copy)

                        }
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateFinished">Date Completed</label>
                <input
                    type="date"
                    required
                    className="form-control"
                    id="dateFinished"
                    placeholder="When did you finish reading?"
                    onChange={
                        (event) => {
                            const copy = {...createdBHObj}
                            copy.dateCompleted = event.target.value
                            setCreatedBHObj(copy)

                        }
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateFinished">Entry</label>
                <textarea
                    type="text"
                    required
                    className="form-control"
                    id="dateFinished"
                    placeholder="Got thoughts? Put them here."
                    onChange={
                        (event) => {
                            const copy = {...createdBHObj}
                            copy.entry = event.target.value
                            setCreatedBHObj(copy)

                        }
                    }
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="re-read">Mark for re-read?</label>
                <input
                    type="checkbox"
                    className="form-control"
                    id="re-read"
                    onChange={
                        (event) => {
                            const copy = {...createdBHObj}
                            copy.reRead = event.target.checked
                            setCreatedBHObj(copy)

                        }
                    }
                />
            </div>
            <button type="submit"
                className="btn"
                onClick={
                    (event) => {
                        createBookHistoryObject(event)
                        
                    }}> Submit </button>
            <button>
            Cancel</button>
        </form>
    )

}
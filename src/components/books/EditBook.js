import { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { useState } from "react/cjs/react.development"

export const EditBook = () => {
    const history = useHistory()
    const [currentBook, setCurrentBook] = useState({})
    const { bookId } = useParams()
    const [editedBook, setEditedBook] = useState({
        dateStarted: "",
        dateCompleted: "",
        entry: "",
        reRead: false
    })

    useEffect(() => {
        getById(bookId)
            .then((book) => {
                    setCurrentBook(book)
                })
    }, [])
    
    const getById = (bookId) => {
        return fetch(`http://localhost:8088/history/${bookId}?_expand=book`)
                .then(res => res.json())
    }
    
    const editBook = (event) => {
        event.preventDefault()
        const bookToEdit = {
            "userId": currentBook.userId,
            "bookId": currentBook.bookId,
            "dateStarted": editedBook.dateStarted,
            "dateCompleted": editedBook.dateCompleted,
            "entry": editedBook.entry,
            "reRead": editedBook.reRead
        }

        return fetch(`http://localhost:8088/history/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookToEdit)
        })
            .then(() => {
                history.push("/myBH")
            }
            )
    }
    

        


    return (
        <form className="bookToHistory__Form">
            <h2>Edit this bookHistory</h2>
            <div>
                <p>Date Started: {currentBook?.dateStarted} </p>
                <p>Date Completed:</p>
                <p>Entry: </p>
                <p>Marked for re-read: </p>
            </div>
            <div className="form-group">
                <label htmlFor="dateStarted">Date Started </label>
                <input
                    type="date"
                    required
                    autoFocus
                    className="form-control"
                    id="dateStarted"
                    onChange={
                        (event) => {
                            const copy = {...editedBook}
                            copy.dateStarted = event.target.value
                            setEditedBook(copy)

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
                            const copy = {...editedBook}
                            copy.dateCompleted = event.target.value
                            setEditedBook(copy)

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
                            const copy = {...editedBook}
                            copy.entry = event.target.value
                            setEditedBook(copy)

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
                            const copy = {...editedBook}
                            copy.reRead = event.target.checked
                            setEditedBook(copy)

                        }
                    }
                />
            </div>
            <button type="submit"
                className="btn"
                onClick={(event) => {
                    editBook(event)
                }}
                > Save </button>
        </form>
    )
}
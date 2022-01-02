import  apiSettings  from "./apiSettings"
import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { useHistory } from "react-router"
import { SearchResults } from "./Search"
import { BookForm } from "../books/BookForm"

//Responsibility - DataAccess. This component handles fetching data from the API and creating a bookObject in my database with that information. 


export const BookData = () => {
    const [booksInData, updateBooksInData] = useState([]) // these are the books in my database
    const [bookData, setBookData] = useState([]) // search results from the GoogleAPI
    const [search, setSearch] = useState({ // title of the book that the user has selected in search results
        title : ""
    })
    const [selectedBook, updateSelectedBook] = useState({}) // book object holding all the book information that the user selected
    const [tbrSelected, setTbrSelected] = useState(false)

    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/books`)
            .then(res => res.json())
            .then((booksArray) => {
                updateBooksInData(booksArray)
            })
        },[bookData]
    )

    useEffect(() => {
        if (tbrSelected === true) {
            history.push("/myTBR")
        }
    }, [])


    const fetchSearch = () => { ///GET call to the API with the user's search
        fetch(`${apiSettings.apiURL}${search.title.replaceAll(" ","+")}${apiSettings.apiKEY}`)
                .then(response => response.json())
                .then((data) => {
                    setBookData(data.items)
                }
                )
    }

    const saveBook = (bookObj) => { //This function creates a book object in my api with the information pulled from GoogleBooks Api. 
        const findAuthor = bookObj.volumeInfo.authors.map((author) => {return author})
        
        const newBook = {
            name: bookObj.volumeInfo.title, 
            author: findAuthor, 
            description: bookObj.volumeInfo.description,
            apiBookId: bookObj.id,
            image: bookObj.volumeInfo.imageLinks.thumbnail
        }


        return fetch(`http://localhost:8088/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
            .then(() => {
                updateSelectedBook(newBook)
            })
    }

    const saveToTBR = (bookObj) => { //this is not completely functional - still working on this Stretch goal. 
        setTbrSelected(true)
        const findBook = booksInData.find((book) => book.apiBookId === bookObj.id)
        
        const bookTBR = {
            bookId: findBook.id,
            userId: parseInt(localStorage.getItem("bookHistory_user"))
        }
        return fetch(`http://localhost:8088/tbr`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookTBR)
        })
            .then(() => {
                history.push("/myTBR")
            })
    }

    

    return(
        <>
            <h3 className="Search">Search for a book</h3>
            <div className="Search">
                <input onChange={
                    (event) => {
                        const copy = {...search}
                        copy.title = event.target.value
                        setSearch(copy)
                    }
                }></input>
                <button className="bookDetails__Button" onClick={fetchSearch}>Submit</button>
                { selectedBook.name 
                    ? <BookForm updateSelectedBook={updateSelectedBook} booksArray={booksInData} selectedBook={selectedBook}/>
                    :<SearchResults key={search.title} bookData={bookData} saveBook={saveBook} saveToTBR={saveToTBR} selectedBook={selectedBook}/>
                }
            </div>
        </>
    )
}


import  apiSettings  from "./apiSettings"
import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { useHistory } from "react-router"
import { bookList } from "../books/BookList"
import { SearchResults } from "./Search"

export const BookData = () => {
    const [booksInData, updateBooksInData] = useState([])
    const [bookData, setBookData] = useState([])
    const [search, setSearch] = useState({
        title : ""
    })

    

    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/books`)
            .then(res => res.json())
            .then((booksArray) => {
                updateBooksInData(booksArray)
            })
        },[]
    )
    const fetchSearch = () => {
        fetch(`${apiSettings.apiURL}${search.title.replaceAll(" ","+")}${apiSettings.apiKEY}`)
                .then(response => response.json())
                .then((data) => {
                    setBookData(data.items)
                }
                )
    }

    const saveBook = (bookObj) => {
        const findAuthor = bookObj.volumeInfo.authors.map((author) => {return author})
        
        const newBook = {
            name: bookObj.volumeInfo.title, 
            author: findAuthor, 
            description: bookObj.searchInfo.textSnippet,
            apiBookId: bookObj.id
        }


        return fetch(`http://localhost:8088/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        })
            .then(() => {
                history.push("/myBH")
            })
    }

    const saveToTBR = (bookObj) => {
        const findBook = booksInData.find((book) => {
            if (book.apiBookId === bookObj.id) {
                return book.id
            }})
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
                history.push("/TBR")
            })
    }

    return(
        <>
            <h3>Search for a book</h3>
            <div>
                <input onChange={
                    (event) => {
                        const copy = {...search}
                        copy.title = event.target.value
                        setSearch(copy)
                    }
                }></input>
                <button onClick={fetchSearch}>Submit</button>
                {
                    <SearchResults bookData={bookData} saveBook={saveBook} saveToTBR={saveToTBR} />
                }
            </div>
        </>
    )
}

// { bookData
//     ?
//         bookData.map(
//             (bookObj) => {
//                 return (
//                     <div>
//                         <p key={bookObj.id} id={bookObj.id}>{bookObj.volumeInfo.title} </p><button onClick={
//                             (event) => {
//                                 saveBook(bookObj)
//                             } 
//                         }>BookHistory</button> <button onClick={
//                             (event) => {
//                                 saveBook(bookObj)
//                                 .then(() => {
//                                     saveToTBR(bookObj)
//                                 })
//                             }
//                         }>TBR</button>
//                     </div> )
//         }
//     )
//     : ""
// }
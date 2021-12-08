import  apiSettings  from "./apiSettings"
import { useState } from "react"
import { useEffect } from "react/cjs/react.development"

export const BookData = () => {
    const [bookData, setBookData] = useState([])
    const [search, setSearch] = useState({
        title : ""
    })


    useEffect(
        () => {
            fetchSearch()
        }, []
    )

    
    const fetchSearch = () => {
        fetch(`${apiSettings.apiURL}${search.title.replaceAll(" ","+")}${apiSettings.apiKEY}`)
                .then(response => response.json())
                .then((data) => {
                    setBookData(data.items)
                }
                )
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
            </div>
            <h3>Results</h3>
            { bookData
                ?
                    bookData.map(
                        (bookObj) => {
                            return (
                                <div>
                                    <p key={bookObj.id} id={bookObj.id}>{bookObj.volumeInfo.title} </p><button onClick={
                                        (event) => {
                                            console.log(bookObj.id)
                                        } 
                                    }>BookHistory</button> <button>TBR</button>
                                </div> )
                    }
                )
                : ""
            }
        </>
    )
}

import { useHistory } from "react-router"
import "./search.css"
export const SearchResults = ({bookData, saveBook, saveToTBR}) => {
    const history = useHistory()

    return(
        <>
            {
                    bookData.map(
                        (bookObj) => {
                            return (
                                <div>
                                    <p key={bookObj.id} id={bookObj.id}>{bookObj.volumeInfo.title} by {bookObj.volumeInfo.authors[0]}</p><button className="bookDetails__Button" onClick={
                                        (event) => {
                                            saveBook(bookObj)
                                        } 
                                    }>BookHistory</button> <button className="bookDetails__Button" onClick={
                                        (event) => {
                                            saveBook(bookObj)
                                            .then(() => {
                                                history.push("/myTBR")
                                                saveToTBR(bookObj)
                                            })
                                        }
                                    }>TBR</button>
                                </div> )
                    }
                )
            }
        </>
    )
}
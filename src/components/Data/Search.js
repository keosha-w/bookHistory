import "./search.css"
export const SearchResults = ({bookData, saveBook, saveToTBR}) => {


    return(
        <>
            {
                    bookData.map(
                        (bookObj) => {
                            return (
                                <div>
                                    <p key={bookObj.id} id={bookObj.id}>{bookObj.volumeInfo.title} by {bookObj.volumeInfo.authors[0]}</p><button onClick={
                                        (event) => {
                                            saveBook(bookObj)
                                        } 
                                    }>BookHistory</button> <button onClick={
                                        (event) => {
                                            saveBook(bookObj)
                                            .then(() => {
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
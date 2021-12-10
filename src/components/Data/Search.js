export const SearchResults = ({bookData, saveBook, saveToTBR}) => {


    return(
        <>
        <h3>Results</h3>
            {
                    bookData.map(
                        (bookObj) => {
                            return (
                                <div>
                                    <p key={bookObj.id} id={bookObj.id}>{bookObj.volumeInfo.title} </p><button onClick={
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


export const TBRBook = ({book}) => {


    return(
        <div className="book">
                    <h4>{book?.book?.name} by {book?.book?.author}</h4>
                </div>
    )
}
import { useState } from "react/cjs/react.development"


export const BookForm = () => {
    
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
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="re-read">Mark for re-read?</label>
                <input
                    type="checkbox"
                    className="form-control"
                    id="re-read"
                />
            </div>
            <button type="submit"
                className="btn"> Submit </button>
        </form>
    )

}
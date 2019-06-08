import React from "react";

import "../style/style.css";

const Search = props => {
    return (
        <form onSubmit={props.handleSubmit} className="filter-form">
            <input
                name="name"
                type="text"
                className="filter-search"
                placeholder="Enter name"
                onChange={props.handleChange}
                defaultValue={props.searchValue}
            />
        </form>
    );
};

export default Search;

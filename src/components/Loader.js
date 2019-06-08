import React from "react";

import loaderImage from "../images/spinner.svg";

import "../style/style.css";

const Loader = props => {
    const isLoaded = props.isLoaded;

    if (!isLoaded) {
        return (
            <div className="preloader">
                <img src={loaderImage} alt="spinner" />
            </div>
        );
    }

    return props.children;
};

export default Loader;

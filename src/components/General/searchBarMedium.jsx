import React from "react";
import { ButtonSmallRed } from "./ButtonSmallRed";
import { SearchBox } from "./SearchBox";
import "./style.css";

export const SearchBarNormal = ({ searchBoxSearchIcon = "image.svg", searchBoxText = "Input field" }) => {
    return (
        <div className="search-box-norrmal">
            <div className="overlap">
                <SearchBox className="search-box-instance" searchIcon={searchBoxSearchIcon} text={searchBoxText} />
                <ButtonSmallRed
                    className="button-small-red-instance"
                    divClassName="design-component-instance-node"
                    property1="default"
                    text="Find"
                />
            </div>
        </div>
    );
};

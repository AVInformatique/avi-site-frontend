import React from 'react';
import { useState } from 'react';
import './dropDown.css';

import { RiArrowDropDownLine } from "react-icons/ri";

export const DropDown = ({ listItems = [], callback = ()=>{},
                            size = 'medium', text = 'Text', divClassName='' }) => {

    const [isOpenMenu, openCloseMenu] = useState(false);
    const [selectedIndex, changeIndex] = useState(-1);
    
    const handleDropDown = (event) => {
        event.preventDefault();
        openCloseMenu(!isOpenMenu);
    }

    const handleClickMenuItem = (event) => {
        openCloseMenu(!isOpenMenu);
        callback(event.currentTarget.getAttribute('data'));
        changeIndex(event.currentTarget.getAttribute('data-index'));
    }

    return (
        <div className={`dropDown ${size} ${divClassName}`}>
            <div className="selected-box"
                onClick={handleDropDown}
            >
                <p className="text">
                    {selectedIndex == -1 ? text : listItems[selectedIndex]}
                </p>
                <div className="icon"><RiArrowDropDownLine /></div>
            </div> 

            <div className={`overlay ${!isOpenMenu ? 'closed' : ''}`}
                 style={{width : window.screen.width,
                        height : window.screen.height}}
                onClick={handleDropDown}
            >        
            </div>

            <ul className={`menu ${!isOpenMenu ? 'closed' : ''}`}>
                {listItems.map((item, index) => (
                    <li key={index} data-index={index} data={item}
                        onClick={handleClickMenuItem}
                        className={`dropdown-item ${(selectedIndex === index) ? 'selected' : ''}`}
                    >
                        <p className="item-text">{item}</p>
                    </li>
                ))}
            </ul>


        </div>
    )

};

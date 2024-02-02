import React from 'react';
import { useState, useEffect } from 'react';
import './dropDown.css';

import { RiArrowDropDownLine } from "react-icons/ri";

export const DropDown = ({ listItems = [], callback = ()=>{}, doRefresh = 0,
                            size = 'medium', text = 'Text', divClassName='' }) => {

    const [isOpenMenu, openCloseMenu] = useState(false);
    const [selectedIndex, changeIndex] = useState(0);
    
    const handleDropDown = (event) => {
        event.preventDefault();
        openCloseMenu(!isOpenMenu);
    }

    const handleClickMenuItem = (event) => {
        openCloseMenu(!isOpenMenu);
        let index = event.currentTarget.getAttribute('data-index');
        let data = event.currentTarget.getAttribute('data')
        callback(data, parseInt(index));
        changeIndex(index);
    }

    const resetValue = () => {
        changeIndex(0)
        callback(listItems[0], 0);
    }

    useEffect(() => {if (doRefresh>0) {resetValue()}},[doRefresh]);

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

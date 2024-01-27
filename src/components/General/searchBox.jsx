import React from 'react';
import { useState } from 'react';
import './searchBox.css';

import { ButtonComp } from './buttonComp';

import { IoMdSearch } from "react-icons/io";

export const SearchBox = ({ callback = ()=>{}, usedAsFrom = false, sendInputValue = ()=>{},
                            size = 'medium', text = 'Text', divClassName='' }) => {
    
    var inputValue = ''
    return (
        <form className={`search-box ${divClassName}`}>
            <div className="icon">
                <IoMdSearch/>
            </div>
            <input type="text" className="input-field" name="search" placeholder={text} 
                    onChange={(e) => {
                        inputValue = e.target.value;
                        sendInputValue(inputValue)}}/>
            <ButtonComp
                size = 'small'
                text=  'Find'
                color = 'red'
                divClassName= 'buton-search'
                isUsedSubmit={usedAsFrom}
                callback = {(e) => {callback(inputValue, e)}}
            ></ButtonComp>
        </form>
    );
}

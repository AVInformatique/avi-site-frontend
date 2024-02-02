import React from 'react';
import { useEffect } from 'react';
import './searchBox.css';

import { ButtonComp } from './buttonComp';

import { IoMdSearch } from "react-icons/io";

export const SearchBox = ({ callback = ()=>{}, usedAsFrom = false, 
                            sendInputValue = ()=>{}, doRefresh = 0, value = '',
                            size = 'medium', placeholder = 'Text', divClassName='' }) => {
    
    const resetValue = () => {
        sendInputValue("");
        setInputValue("");
    }

    const setInputValue = (val) => {        
        const inputs = document.querySelectorAll(`.search-box${divClassName == "" ? "" : "."+divClassName} .input-field`);
        inputs.forEach(input => {input.value = value;});
    }

    useEffect(() => {setInputValue()}, []);

    useEffect(() => {if (doRefresh>0) {resetValue()}}, [doRefresh]);
    
    var inputValue = ''
    return (
        <form className={`search-box ${divClassName}`}>
            <div className="icon">
                <IoMdSearch/>
            </div>
            <input type="text" className="input-field" 
                    name="search" placeholder={placeholder} 
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

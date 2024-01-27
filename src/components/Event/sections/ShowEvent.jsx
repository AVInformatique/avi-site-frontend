import { useState, useEffect, Fragment } from 'react';
import '/src/grid.css';
import './ShowEvent.css';

import { getEvents } from '/src/services/eventService.js';

import {DropDown} from '/src/components/General/dropDown'
import {ButtonIcon} from '/src/components/General/buttonIcon'

import { IoMdSearch } from "react-icons/io";

const ShowEvent = () => {

    const [events, setEvents] = useState([{}]);
    const [monthFilter, setMonth] = useState("*");
    const [yearFilter, setYear] = useState("*");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (monthFilter === "*" && monthFilter === "*") {
                    const events = await getEvents();
                    setEvents(events);
                } else {
                    console.log(monthFilter, yearFilter)
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchData();
    }, [monthFilter, yearFilter]);
    
    const title_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let year = 2021; year <= currentYear; year++) {
        yearList.push(year.toString());
    }

    return (
        <div className="welcome-event section grid wide">
            <div className="row head">
                <div className="col l-12">
                    <h4 className="">Discovers</h4>
                    <h2 className='title'>AVI Events</h2>
                    <span className='description'>{title_description}</span>
                </div>
            </div>

            <div className="row filter-bar">
                <div className="col l-1 search-icon">
                    <ButtonIcon icon = {<IoMdSearch 

                    />} ></ButtonIcon>
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={monthList}
                        text = "Month"
                        size = "small"
                        callback = {(month) => {setMonth(month);}}
                    />
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={yearList}
                        text = "Year"
                        size = "small"
                        callback = {(year) => {setYear(year);}}
                    />
                </div>
                <div className="col l-7">
                    <div className="search-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default ShowEvent;

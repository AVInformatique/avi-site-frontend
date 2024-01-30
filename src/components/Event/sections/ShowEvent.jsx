import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom'
import '/src/grid.css';
import './ShowEvent.css';

import { getEvents, getEventsByTimeAndName } from '/src/services/eventService.js';

import { DropDown } from '/src/components/General/dropDown'
import { ButtonIcon } from '/src/components/General/buttonIcon'
import { SearchBox } from '/src/components/General/searchBox'
import { EventBoxMedium } from '../eventBoxMedium'

import { IoMdSearch } from "react-icons/io";

const ShowEvent = () => {

    const [events, setEvents] = useState([{}]);
    const [searchParams, setSearchParams] = useSearchParams()
    const [monthFilter, setMonth] = useState("*");
    const [yearFilter, setYear] = useState("*");
    const [slug, setSlug] = useState(searchParams.get('search') || "");

    async function fetchData() {
        try {
            if (slug != '') {
                searchParams.set('search', slug);
                setSearchParams(searchParams);
            }
            const events = await getEventsByTimeAndName(monthFilter, yearFilter, slug);
            setEvents(events);
            console.log(monthFilter, yearFilter, slug)
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => { 
        fetchData();
        if (searchParams.get('search')) {
            window.scrollTo(0, 800);
        }
    }, []);
    
    const title_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const monthList = ["Month","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const currentYear = new Date().getFullYear();
    const yearList = ["Year"];
    for (let year = 2021; year <= currentYear; year++) {
        yearList.push(year.toString());
    }

    return (
        <div className="show-event section grid wide">
            <div className="row head">
                <div className="col l-12">
                    <h4 className="intro">Discovers</h4>
                    <h2 className='title'>AVI Events</h2>
                    <span className='intro-description'>{title_description}</span>
                </div>
            </div>

            <div className="row filter-bar">
                <div className="col l-1 search-icon">
                    <ButtonIcon icon = {<IoMdSearch/>} ></ButtonIcon>
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={monthList}
                        text = "Month"
                        size = "small"
                        callback = {(month, index) => {setMonth(index === "0" ? "*" : index)}}
                    />
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={yearList}
                        text = "Year"
                        size = "small"
                        callback = {(year) => {setYear(year === "Year" ? "*" : year);}}
                    />
                </div>
                <div className="col l-7">
                    <SearchBox
                        callback = {()=>{fetchData()}}
                        usedAsFrom = {false}
                        text = {slug || 'Looking for some events?'}
                        sendInputValue = {setSlug}
                    ></SearchBox>
                </div>
            </div>

            <div className="event-list row">
                {events.map((event, index) => 
                        (<div key={index} className="col l-4">
                            <EventBoxMedium 
                                event = {event}
                                divClassName="event-box-medium"
                            ></EventBoxMedium>
                        </div>)
                    )}

            </div>
        </div>
    );
};

export default ShowEvent;

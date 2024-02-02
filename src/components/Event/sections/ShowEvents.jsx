import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'

import '/src/grid.css';
import './ShowEvents.css';

// Event handlers
import { getEventsByTimeAndName } from '/src/services/eventService.js';

// Components
import { DropDown } from '/src/components/General/dropDown'
import { ButtonIcon } from '/src/components/General/buttonIcon'
import { SearchBox } from '/src/components/General/searchBox'
import { EventBoxMedium } from '../basics/eventBoxMedium'

// Icons
import { IoClose } from "react-icons/io5";

const ShowEvent = () => {
    const yearDebut = 2021;

    const [searchParams, setSearchParams] = useSearchParams()

    const [events, setEvents] = useState([{}]);    
    const [monthIndex, setMonthIndex] = useState(0);
    const [yearIndex, setYearIndex] = useState(0);
    const [slug, setSlug] = useState(searchParams.get('search') || "");
    const [doRefresh, setDoRefresh] = useState(0);

    async function fetchData(isRefresh = false) {
        try {
            if (slug != '') {
                searchParams.set('search', slug);
                setSearchParams(searchParams);
            }
            const events = isRefresh 
                            ? await getEventsByTimeAndName(0, 0, '')
                            : await getEventsByTimeAndName(monthIndex, yearIndex && (yearIndex+yearDebut-1), slug);
                            

            setEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    function deleteFilter() {
        setDoRefresh(doRefresh+1); 
        fetchData(true);
        searchParams.delete('search');
        setSearchParams(searchParams);
    }

    useEffect(() => { 
        fetchData();
        if (searchParams.get('search')) {
            window.scrollTo(0, 1500);
        }
    }, []);
    
    const title_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    const monthList = ["Month","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const currentYear = new Date().getFullYear();
    const yearList = ["Year"];
    for (let year = yearDebut; year <= currentYear; year++) {
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
                    <ButtonIcon 
                        icon = {<IoClose />} 
                        callback = {() => {deleteFilter()}}    
                    ></ButtonIcon>
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={monthList}
                        text = "Month"
                        size = "small"
                        callback = {(month, index) => {setMonthIndex(index)}}
                        doRefresh = {doRefresh}
                    />
                </div>
                <div className="col l-2">
                    <DropDown
                        listItems={yearList}
                        text = "Year"
                        size = "small"
                        callback = {(year, index) => {setYearIndex(index)}}
                        doRefresh = {doRefresh}
                    />
                </div>
                <div className="col l-7">
                    <SearchBox
                        callback = {()=>{fetchData()}}
                        usedAsFrom = {false}
                        placeholder = {'Looking for some events?'}
                        value = {searchParams.get('search')}
                        sendInputValue = {setSlug}
                        doRefresh = {doRefresh}
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

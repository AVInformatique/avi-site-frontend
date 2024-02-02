import { useSearchParams } from 'react-router-dom'

import '/src/grid.css';
import './WelcomeEvent.css';

//components
import { EventBoxLarge } from '../basics/eventBoxLarge';
import { SearchBox } from '/src/components/General/searchBox'

const WelcomeEvent = ({event}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className="welcome-event section grid wide">
            <div className="row head">
                <div className="title col l-4">
                    <h2>Events</h2>
                </div>
                <div className="col l-8">
                    <SearchBox
                        usedAsFrom = {true}
                        placeholder = {'Looking for some events?'}
                        value = {searchParams.get('search')}
                    ></SearchBox>
                </div>
            </div>

            <EventBoxLarge event = {event}></EventBoxLarge>
        </div>
    );
};

export default WelcomeEvent;

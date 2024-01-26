import { Fragment } from 'react';

import Home from '/src/components/home/Home';

const HomePage = () => {
    return (
        <Fragment>
            {/* Divide the home page into two parts
            Left side: Introduction of AVI (Association des Vietnamiens a l'INSA)
            Right side: An Image of AVI
            */}

            {/* <Navbar /> */}

            <Home />
        </Fragment>
    );
};

export default HomePage;
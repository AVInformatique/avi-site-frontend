import { Fragment } from 'react';

import Navbar from "../components/Navbar/navbar"

const Home = () => {
    return (
        <Fragment>
            {/* <Navbar /> */}
            <div className="container-index">
                <article>
                <h1>What is Lorem Ipsum? </h1>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry...
                </article>
            </div>
        </Fragment>
    );
};

export default Home;
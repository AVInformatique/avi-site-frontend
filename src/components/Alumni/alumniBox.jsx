// Each alumni has a box contain their image, name, major and promotion
// Each row has 3 alumni boxes

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'react-bootstrap';
import PropTypes from "prop-types";


export const AlumniBox = ({ name, major, promotion, image }) => {
    return (
        <>
            <Card className="alumni-box">
                <CardImg variant="top" src={image} style={{ width: "30%", height: "30%" }} />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>{major}</CardSubtitle>
                    <CardSubtitle>{promotion}</CardSubtitle>
                </CardBody>
            </Card>
        </>
    );
};

AlumniBox.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    promotion: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};
// Each alumni has a box contain their image, name, major and promotion
// Each row has 3 alumni boxes

// import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'react-bootstrap';
import PropTypes from "prop-types";
import "./alumniBox.css";


export const AlumniBox = ({ name, major, image }) => {
    return (
        <div className="alumni-box">
            {/* <Card className="alumni-box">
                <CardImg variant="top" src={image} style={{ width: "50%", height: "50%" }} />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>{major}</CardSubtitle>
                    <CardSubtitle>{promotion}</CardSubtitle>
                </CardBody>
            </Card> */}
            <div className="img-container">
                <img className="alumni-box-img" src={image} alt={name}/>
                
            </div>
            <div className="alumni-box-info">
                <div className="alumni-box-name">{name}</div>
                <div className="alumni-box-major">{major}</div>
                {/* <div className="alumni-box-promotion">{promotion}</div> */}
            </div>
        
        </div>
    );
};

AlumniBox.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    promotion: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};
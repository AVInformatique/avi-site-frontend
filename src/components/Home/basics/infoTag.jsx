import './infoTag.css';

export const InfoTag = ({ icon, title = 'title', description = '',
                         divClassName='', color='yellow' }) => {

    return (
        <div className={`info-tag ${divClassName} ${color}`}>
            <div className="overlap">
                <div className="icon">{icon}</div>
                <p className="title">{title}</p>
                <p className="description">{description}</p>
            </div>
        </div>
    );
};

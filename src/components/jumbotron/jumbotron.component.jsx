import React, { useState } from "react";
import './jumbotron.styles.scss';

export const JumbotronItem = ({ image }) => {
    return (
        <div className="jumbotronItemContainer" style={{ backgroundImage: `url(${image})` }}>

        </div>
    );
}

const Jumbotron = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };
    return (
        <div className="jumbotronContainer">
            <div className="inner" style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                {
                    React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, {width: "100%"})
                    })
                }
            </div>
            <div className="indicators">
                {React.Children.map(children, (child, index) => {
                    return (
                        <button
                            className={`${(index === activeIndex) ? 'active' : ''}`}
                            onClick={() => {
                                updateIndex(index);
                            }}
                        >
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

export default Jumbotron;
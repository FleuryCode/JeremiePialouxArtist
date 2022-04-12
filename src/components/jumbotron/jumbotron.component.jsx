import React, { useState, useEffect } from "react";
import './jumbotron.styles.scss';
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export const JumbotronItem = ({ image }) => {
    return (
        <Link to={'/bio'} className="jumbotronItemContainer" style={{ backgroundImage: `url(${image})` }}>

        </Link>
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

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(activeIndex + 1);
        }, 3000);
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    });

    // Swipe Functions For Mobile
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });
    return (
        <div className="jumbotronContainer" {...swipeHandlers}>
            <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {
                    React.Children.map(children, (child, index) => {
                        return React.cloneElement(child, { width: "100%" })
                    })
                }
            </div>
            <div className="indicators">
                <div className="indicatorContainer">
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
        </div>
    );
}

export default Jumbotron;
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";

import "./Scroll.css";

const ScrollArrow = () => {
    // Track whether the scroll arrow is needed.
    const [showScroll, setShowScroll] = useState(null);
    // Check the scroll state, re-memoize when scroll state changes.
    const checkScrollTop = useCallback(() => {
        const headerHeight = 400;

        if (!showScroll && window.pageYOffset > headerHeight) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= headerHeight) {
            setShowScroll(false);
        }
    }, [showScroll]);
    // Add/remove the event listener when the component is unmounted or the scroll state has changed.
    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => {
            window.removeEventListener("scroll", checkScrollTop);
        };
    }, [checkScrollTop]);

    // const scrollTop = () => {
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    // };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="scrollTop">
                <Link activeClass="active" to="top" spy={true} smooth={true} offset={-70} duration={500}>
                    <FontAwesomeIcon
                        icon={faArrowCircleUp}
                        size="2x"
                        style={{ display: showScroll ? "flex" : "none", textAlign: "center" }}
                    />
                </Link>
            </div>
            {/* <div className="scrollTop">
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    onClick={scrollTop}
                    size="2x"
                    style={{ display: showScroll ? "flex" : "none", textAlign: "center" }}
                />
            </div> */}
        </div>
    );
};

export default ScrollArrow;

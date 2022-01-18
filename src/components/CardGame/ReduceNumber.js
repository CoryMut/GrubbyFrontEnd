import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";

function ReduceNumber({ count, sign }) {
    const [show, setShow] = useState(true);
    const { number } = useSpring({
        from: { number: Number(count) },
        number: 0,
        delay: 200,
        config: config.molasses,
        onRest: () => setShow(false),
    });

    return (
        <div>
            {show && (
                <div className="text-center">
                    {sign}{" "}
                    <animated.span style={{ visibility: number === 0 ? "hidden" : "show" }}>
                        {number.to((n) => {
                            return Number(n.toFixed(0)).toLocaleString();
                        })}
                    </animated.span>
                </div>
            )}
        </div>
    );
}

export default ReduceNumber;

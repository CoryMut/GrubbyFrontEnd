import React from "react";
import { useSpring, animated, config } from "react-spring";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

function IncreaseNumber({ count, increase }) {
    const { number } = useSpring({
        from: { number: Number(count) },
        number: Number(count) + Number(increase),
        delay: 200,
        config: config.molasses,
        loop: false,
    });

    return (
        <animated.span>
            {number.to((n) => {
                return Number(n.toFixed(0)).toLocaleString();
            })}
        </animated.span>
    );
}

export default IncreaseNumber;

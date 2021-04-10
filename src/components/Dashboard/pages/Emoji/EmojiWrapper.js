import React from "react";

const EmojiWrapper = ({ className, symbol, label }) => {
    return (
        <span
            role="img"
            aria-label={label ? label : ""}
            aria-hidden={label ? "false" : "true"}
            className={className}
            style={{overflow:"hidden"}}
        >
            {symbol}
        </span>
    );
};

export default EmojiWrapper;

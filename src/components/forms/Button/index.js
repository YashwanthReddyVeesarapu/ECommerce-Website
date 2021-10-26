import React from 'react';
import './styles.scss';

const Buttons = ({ children, ...otherProps }) => {
    return (
        <button disabled={otherProps.disable === 'true' ? true : false} className="btn" {...otherProps}>
            {children}

        </button>
    );
}

export default Buttons;
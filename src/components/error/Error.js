import React, { useState, useEffect } from 'react';

const Error = ({ error }) => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        let closeTimeout = setTimeout(() => setOpen(false),3000);

        return () => {
            clearTimeout(closeTimeout);
        }
    });
    if (open) {
        
        return (
            <div className="error">
                <span>{error}</span> 
            </div>
        )
    } else {
        return null;
    }
}

export default Error;
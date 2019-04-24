import React from 'react';

const PageIndicator = ({ genre, selectedGenre, setGenre }) => (
    <div className="page-indicator" onClick={() => setGenre(genre)} style={genre === selectedGenre ? {background: '#006989'} : null}>
        <span style={genre === selectedGenre ? {color: '#EAEBED'} : null}>{genre}</span>
    </div>
)

export default PageIndicator;
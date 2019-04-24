import React from 'react';
import PageIndicator from './PageIndicator';

const PageIndicators = ({ genres, selectedGenre, setGenre }) => (
    <div className="page-indicators selected">
        {genres.map(genre => (
            <PageIndicator key={genre} genre={genre} selectedGenre={selectedGenre} setGenre={setGenre} />
        ))}
    </div>
)

export default PageIndicators;
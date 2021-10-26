import React from 'react';

import './styles.scss'

const Division = () => {
    const images = [
        { url: 'https://picsum.photos/900/200?random=1' },
        { url: 'https://picsum.photos/900/200?random=2' },
        { url: 'https://picsum.photos/900/200?random=3' },
        { url: 'https://picsum.photos/900/200?random=4' },
        { url: 'https://picsum.photos/900/200?random=5' }
    ]

    return (
        <>
            <div className="cust" >
                {images.map((img, key) => <img className='slide' key={key} src={img.url} />)}
            </div>

        </>
    )
}

export default Division

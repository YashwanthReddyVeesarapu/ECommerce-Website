import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import './styles.scss'

const FeaturedImagesLayout = () => {
    const history = useHistory();

    const data = [{
        name: 'Rediva',
        src: 'https://picsum.photos/200/300',
        link: `/apparel/rediva`
    },
    {
        src: 'https://picsum.photos/200/300',
        link: `/apparel/all/womens`
    },
    {
        src: 'https://picsum.photos/200/300',
        link: `/apparel/all/mens`
    },
    {
        name: 'Frames',
        src: 'https://picsum.photos/200/300',
        link: "/living"
    },
    ]

    return (
        <div className='horizontalScrool' >
            {Array.isArray(data) && data.map((j, i) => (
                <div key={i} className='div' onClick={() => history.push(j.link)} >
                    <img src={j.src} />
                </div >
            ))}
        </div>
    )
}

export default FeaturedImagesLayout

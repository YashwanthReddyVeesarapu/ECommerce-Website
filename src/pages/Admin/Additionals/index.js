import { Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addSizeChartStart } from '../../../redux/Additionals/additionals.actions';
import { apiInstance } from '../../../Utils';

import './styles.scss'

export const sizeCharts = {
    'womenApparel': [
        {
            label: "WRNHS",
            Url: "https://firebasestorage.googleapis.com/v0/b/rediva-lifestyle.appspot.com/o/Product%2FSize%20chart.webp?alt=media&token=3c1748fa-f436-4875-b6ab-1eb893d9bfeb"
        }, {
            label: "WCTHS",
            Url: "https://firebasestorage.googleapis.com/v0/b/rediva-lifestyle.appspot.com/o/Product%2FF-Crop-Top-Edited.webp?alt=media&token=2b68d80e-8521-4884-b876-ee98763a56f4"
        }, {
            label: "WRN34S",
            Url: "https://firebasestorage.googleapis.com/v0/b/rediva-lifestyle.appspot.com/o/Product%2FUntitled.jpeg?alt=media&token=03760978-4675-4656-88c9-cbd087efa386"
        }, {
            label: "WCHFS",
            Url: "https://firebasestorage.googleapis.com/v0/b/rediva-lifestyle.appspot.com/o/Product%2FWCHFS.webp?alt=media&token=c16aa891-546b-4105-b8c2-cddebba8a5c0"
        }]
}






const Additionals = () => {
    const dispatch = useDispatch();
    const [label, setLabel] = useState();
    const [url, setUrl] = useState();
    const [serverStatus, setServerStatus] = useState(false);

    const set = () => {
        const x = Object.assign({}, sizeCharts.womenApparel, url);

        console.log(x);
        // dispatch(
        //     addSizeChartStart(sizeCharts)
        // )
    }

    useEffect(() => {

        const checkServer = () => {
            apiInstance.get('/ping').then(res => {
                console.log(res)
                if (res.data === 'success') {
                    setServerStatus(true)
                }
                else {
                    setServerStatus(false)
                }
            })
        }
        checkServer()

    }, [])





    return (
        <div>
            <div >
                Size Charts :
                {Object.values(sizeCharts.womenApparel).map((obj, i) => (
                    <div className='each' key={i} >
                        <input placeholder={obj.label} />
                        <div className='imageHolder' >
                            <img className='img' src={obj.Url} />
                        </div>
                        <input placeholder={obj.Url} onChange={(e) => setUrl({ [i]: { label: obj.label, Url: e.target.value } })} />
                    </div>
                ))}
                <Button onClick={set} >
                    Set
                </Button> <br />
                <h1>
                    Server Status:

                    {serverStatus ? <sub style={{ color: 'green' }} >    Running</sub> : <sub style={{ color: 'red' }}  >    Error</sub>}
                </h1>

            </div>

        </div>
    )
}

export default Additionals;

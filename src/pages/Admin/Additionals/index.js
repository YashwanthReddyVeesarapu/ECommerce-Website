import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addSizeChartStart } from '../../../redux/Additionals/additionals.actions';

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

    const set = () => {
        const x = Object.assign({}, sizeCharts.womenApparel, url);

        console.log(x);
        // dispatch(
        //     addSizeChartStart(sizeCharts)
        // )
    }


    return (
        <div>
            <div >
                Size Charts :
                {Object.values(sizeCharts.womenApparel).map((obj, i) => (
                    <div key={i} >
                        <input placeholder={obj.label} />
                        <img width='200' src={obj.Url} />
                        <input placeholder={obj.Url} onChange={(e) => setUrl({ [i]: { label: obj.label, Url: e.target.value } })} />
                    </div>
                ))}
                <Button onClick={set} >
                    Set
                </Button>
            </div>

        </div>
    )
}

export default Additionals;

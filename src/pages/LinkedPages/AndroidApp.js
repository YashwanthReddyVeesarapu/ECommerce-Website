import { Button, Card, CircularProgress } from '@material-ui/core'
import { CloudDownloadRounded, LinearScale } from '@material-ui/icons'
import QR from './../../assets/RedivaAndroidAppQR.png'
import React, { useState, useEffect } from 'react'


const AndroidApp = () => {
    const [loading, setLoading] = useState(false);
    const downloadLink = "https://firebasestorage.googleapis.com/v0/b/rediva-lifestyle.appspot.com/o/App%2FRediva.apk?alt=media&token=cee363c3-5be5-4016-9ba4-5858b1759ea9";
    useEffect(() => {
        if (loading == true) {
            setTimeout(() => {
                setLoading(false)
            }, 5000);
        }
    }, [loading])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center', alignContent: 'center', height: '70vh', alignItems: 'center' }} >
            <div style={{ padding: '2%', border: '2px solid black', color: 'black', borderBottom: 'none' }} >Rediva App for Android</div>

            <div style={{ display: 'flex', flexDirection: 'column', background: 'black', color: 'white', padding: '10px' }}>
                Direct Link
                <Button color='secondary' variant='contained' href={downloadLink} download="Rediva" onClick={() => setLoading(true)} >
                    {loading ? <CircularProgress size={20} color='inherit' /> :
                        <CloudDownloadRounded fontSize='large' color='inherit' />
                    }
                </Button>

            </div>

            <LinearScale />

            <div style={{ display: 'flex', flexDirection: 'column', background: 'black', color: 'white' }}>
                <img style={{ padding: '10px' }} src={QR} />

                Scan QR to download.

            </div>
        </div>
    )
}

export default AndroidApp

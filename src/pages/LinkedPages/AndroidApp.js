import { Button, CircularProgress } from '@material-ui/core'
import { CloudDownloadRounded } from '@material-ui/icons'
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
            <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: "1em", width: '200px' }}>

                <div style={{ display: 'inline-block', color: '#78C257', padding: '10px', borderRadius: '1em', backgroundColor: '#fff', marginBottom: '10px' }} > Android</div>
                <br />

                <Button color='primary' variant='contained' href={downloadLink} download="Rediva" onClick={() => setLoading(true)} >
                    {loading ? <CircularProgress size={20} color='inherit' /> : (<>
                        <div style={{ fontSize: '12px' }} >
                            Download
                        </div>
                        <CloudDownloadRounded fontSize='large' color='inherit' />
                    </>)
                    }
                </Button>

            </div>

            <div style={{ background: 'black', color: 'white', padding: '30px', borderRadius: "1em", width: '250px' }}>

                <a style={{ backgroundColor: '#FF9900', padding: '10px', borderRadius: '1em', color: '#000' }} referrerPolicy="no-referrer" href="https://www.amazon.com/dp/B09JL2VSXN/ref=apps_sf_sta" target="_blank"  >
                    Amazon App Store
                </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', background: 'black', color: 'white' }}>
                <img style={{ padding: '10px' }} src={QR} />

                Scan QR to download.

            </div>
        </div>
    )
}

export default AndroidApp

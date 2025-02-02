import React from 'react';
import { style } from './style';
import QRCode from 'react-qr-code';


interface PQrCode {
    value: string;
}

const QrCode: React.FC<PQrCode> = (props) => {
    const classes = style()
    return (
        <div className={classes.wrapper}>
            <QRCode value={props.value} />
        </div>
    )
}

export default QrCode
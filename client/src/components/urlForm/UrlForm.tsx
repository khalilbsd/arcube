

import { EUrl } from 'enums/EUrl'
import React, { useRef, useState } from 'react'
import useURlService from 'services/url.service'
import { style } from './style'

const UrlForm: React.FC = () => {
    const { shorten } = useURlService()
    const [type, setType] = useState<EUrl>(EUrl.REGULAR)
    const url = useRef<HTMLInputElement>(null)
    const customPath = useRef<HTMLInputElement>(null)

    const changeType = (newType: EUrl) => {
        setType(newType)
    }

    const handleClick = async () => {
        if (!url.current) return
        if (type === EUrl.REGULAR) {
            console.log(url.current.value)
            await shorten({ url: url.current.value })
        } else {
            if (!customPath.current) return
            await shorten({ url: url.current.value, customUrl: customPath.current.value })

        }
    }


    const classes = style()
    return (
        <div className={classes.container}>
            <div className={classes.tabs}>
                <button onClick={() => changeType(EUrl.REGULAR)} className={`${type === EUrl.REGULAR ? 'active' : ''}`}>{EUrl.REGULAR}</button>
                <button onClick={() => changeType(EUrl.CUSTOM)} className={`${type === EUrl.CUSTOM ? 'active' : ''}`}>{EUrl.CUSTOM}</button>
            </div>
            <div className={classes.formContainer}>
                <input placeholder='Write your url here' ref={url} />
                {
                    type === EUrl.CUSTOM &&
                    <input placeholder='Write your custom path' ref={customPath} />
                }
            </div>

            <button className={classes.submitBtn} onClick={handleClick}>
                shorten
            </button>
        </div>

    )
}

export default UrlForm
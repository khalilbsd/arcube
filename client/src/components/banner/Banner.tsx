import React from 'react'
import { style } from './style'

const Banner: React.FC = () => {
    const classes = style()
    return (
        <div className={classes.bannerWrapper}>
            <h1 className={classes.bannerTitle}>
                Shorten. Share. Simplify.
            </h1>
            <h2 className={classes.bannerSubtitle}>
                Turn long URLs into short, shareable links in seconds!
            </h2>
        </div>
    )
}

export default Banner
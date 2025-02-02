import React from 'react'
import { style } from './style'
import { AppLogo } from 'components/icons'

const Navbar: React.FC = () => {
    const classes = style()
    return (
        <div className={classes.navbarContainer}>
            <div className={classes.logo}>
                <AppLogo />
            </div>
        </div>
    )
}

export default Navbar
import { createUseStyles } from "react-jss";



export const style = createUseStyles({
    bannerWrapper: {
        margin:'6% 0',
       height:'auto',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        gap:15,
    },
    bannerTitle:{
        fontSize:'5rem',
        fontWeight:'bold',
        margin:0,
        textAlign:"center",
    },
    bannerSubtitle:{
        fontSize:'1,5rem',
        fontWeight:500,
        margin:0,
        textAlign:"center",


    },

}

)
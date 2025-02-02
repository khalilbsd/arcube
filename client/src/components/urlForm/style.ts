import { createUseStyles } from "react-jss";



export const style = createUseStyles({
    input: {},
    container: {

        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
    },
    tabs: {
        '& button': {
            fontSize: 22,
            background: 'none',
            color: 'var(--body-text)',
            border: 'none',
            textTransform: 'capitalize',
            transition: 'all 0.3s ease-in-out',
            '&.active': {
                color: 'var(--primary)'
            },

        }
    },
    formContainer: {
        marginTop:20,
        marginBottom:20,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        '& input': {
            height: 50,
            padding: "0 10px",
            width: 300,
            borderRadius: 10,
            backgroundColor: 'unset',
            boxShadow: 'none',
            color: 'var(--body-text)',
            fontSize: 16,
            border: '1px solid var(--body-text)',
            '&::placeholder': {
                color: 'var(--body-text)',
                fontSize: 16

            }
        }
    },
    submitBtn: {
        width: 300,
        background: 'linear-gradient(66deg,  var(--primary) 0%, var(--secondary-dark) 100%)',
        height: 50,
        borderRadius: 10,
        border: 'none',
        color: 'var(--body-text)',
        fontSize: 16,
        padding: "0 10px",
        fontWeight:600,
        textTransform:'capitalize'
    }
}

)
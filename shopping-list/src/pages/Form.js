import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles((theme) => {
    return {
        textInput: {
            marginRight: theme.spacing(2),
        },
        formStyle: {
            maxWidth: '52ch',
            margin: '0 auto'
        },
        formButton: {
            marginTop: theme.spacing(3),
        },
    }
});

export default function Form() {
    const classes = useStyles();

    return (
        <Box component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, }}
            autoComplete="off"
            className={classes.formStyle}
        >

            <TextField
                required
                id="outlined-required"
                label="Item name"
                defaultValue=""
                className={classes.textInput}
            />
            <TextField
                required
                id="outlined-required"
                label="Location"
                defaultValue=""
                className={classes.textInput}
            />
            <TextField
                required
                id="outlined-required"
                label="Image URL"
                defaultValue=""
                className={classes.textInput}
            />

            <Button variant="outlined" disabled={false} className={classes.formButton}>Submit</Button>

        </Box>
    )
}

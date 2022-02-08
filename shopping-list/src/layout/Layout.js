import { useLocation } from 'react-router-dom'

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
        },
        appBar: {
            backgroundColor: '#ececec',
            color: '#333333'
        },
        containerLayout: {
            [theme.breakpoints.up('sm')]: {
                marginTop: '90px',
            },
            marginTop: '64px',
            height: '100vh'
        },
        header: {
            marginRight: theme.spacing(1),
            color: '#333333',
        },
        toolBar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        box: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: theme.spacing(17),
            height: theme.spacing(7)

        },
        countStatus: {
            marginRight: theme.spacing(1)
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classes.appBar}
                elevation={0}
            >

                <Toolbar className={classes.toolBar}>
                    <Link style={{ textDecoration: 'none' }} to="/">
                    <Typography gutterBottom variant="h5" className={classes.header} component="div" >Shoppinglist</Typography>
                    </Link>
                    <Box className={classes.box}>
                        <Typography className={classes.countStatus}>
                            6 of 15
                        </Typography>
                        {location.pathname === '/pantry' ? (
                            <Link style={{ textDecoration: 'none' }} to="/form">
                                <Add style={{ color: 'black' }} />
                            </Link>
                        ) : (
                            <Link style={{ textDecoration: 'none' }} to="/pantry">
                                    <Button size="small">Pantry</Button>
                            </Link>)}
                    </Box>
                </Toolbar>
            </AppBar>

            <Container className={classes.containerLayout}>
                {children}
            </Container>
        </div>
    )
}

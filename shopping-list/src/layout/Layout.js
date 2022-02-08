import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
        header: { marginRight: theme.spacing(1) },
        toolBar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        box: {
            display: 'flex',
            alignItems: 'baseline',
        },
        countStatus: {
            marginRight: theme.spacing(1)
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classes.appBar}
                elevation={0}
            >

                <Toolbar className={classes.toolBar}>
                    <Typography gutterBottom variant="h5" className={classes.header} component="div" >Shoppinglist</Typography>
                    <Box className={classes.box}>
                        <Typography className={classes.countStatus}>
                            6 of 15
                        </Typography>
                        <Button size="small">Pantry</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container className={classes.containerLayout}>
                {children}
            </Container>
        </div>
    )
}

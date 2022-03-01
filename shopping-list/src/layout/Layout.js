import { useLocation } from 'react-router-dom'

import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';

import { useSelector, useDispatch } from 'react-redux';
import { updateItemAsync } from '../redux/itemSlice';
import { useEffect, useState } from 'react';



import { filterData } from "../redux/metaSlice";

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
            width: theme.spacing(35),
            height: theme.spacing(7)
        },
        countStatus: {
            marginRight: theme.spacing(1)
        },
        srch: {
            padding: '6px',
            width: '162px',
            margin: '0 10px',

        }
    }
})

export default function Layout({ children }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();
    const stateItems = useSelector((state) => state.items);
    const [itemStatus, setItemStatus] = useState(" ");
    const [activeItems, setActiveItems] = useState([]);


    const clearSelections = () => {
        let upDateIds = activeItems.map(({ id }) => id)
        upDateIds.forEach(id => {
            dispatch(updateItemAsync({ id: id, use_in_list: 0, put_in_basket: 0 }))
        })
    }

    const filt = ({ target }) => {
        dispatch(filterData(target.value));
    }


    useEffect(() => {
        const useInList = stateItems.filter(item => item.use_in_list);
        const putInBask = stateItems.filter(item => item.put_in_bask);

        setActiveItems(useInList);

        switch (location.pathname) {
            case '/':
                setItemStatus(`${putInBask.length} of ${useInList.length}`)
                break;
            case '/pantry':
                setItemStatus(`${useInList.length} of ${stateItems.length}`)
                break;
        }
    }, [stateItems]);

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
                    <input className={classes.srch} onChange={filt} type="text" />
                    <Box className={classes.box}>
                        <Typography className={classes.countStatus}>
                            {itemStatus}
                        </Typography>
                        {location.pathname === '/pantry' ? (
                            <>
                                <Clear style={{ color: 'black' }} title="Clear selections" onClick={clearSelections} />
                                <Link style={{ textDecoration: 'none' }} title="Add selection" to="/form">
                                    <Add style={{ color: 'black' }} />
                                </Link>
                            </>
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

import { useEffect } from 'react';
import PantryItem from '../components/PantryItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/styles';

import { useSelector, useDispatch } from 'react-redux';
import { getItemsAsync } from '../redux/itemSlice';



const useStyles = makeStyles((theme) => {
    return {

        cardMedia: {
            objectFit: 'contain',
            height: theme.spacing(9),
        },

    }
});

export default function Pantry() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const stateItems = useSelector((state) => state.items);
    const items = Object.values(stateItems);

    useEffect(() => {
        dispatch(getItemsAsync());
    }, [dispatch]);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Save</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Location</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <PantryItem key={item.id} row={item} />
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

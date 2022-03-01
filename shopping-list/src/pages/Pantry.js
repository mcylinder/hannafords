import { useEffect, useState } from 'react';
import PantryItem from '../components/PantryItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from '@material-ui/styles';
import { getItemsAsync, updateOrderAsync } from '../redux/itemSlice';

const useStyles = makeStyles((theme) => {
    return {
        cardMedia: {
            objectFit: 'contain',
            height: theme.spacing(9),
        },
    }
});

export default function Pantry() {

    // const classes = useStyles();
    const dispatch = useDispatch();
    const stateItems = useSelector((state) => state.items);
    const filter = useSelector((state) => state.meta);
    const [items, setItems] = useState([]);
    const [dragId, setDragId] = useState();



    useEffect(() => {
        dispatch(getItemsAsync());
    }, [dispatch]);

    useEffect(() => {
        setItems(Object.values(stateItems));
    }, [stateItems]);

    const handleDrag = (ev) => {
        ev.target.style.opacity = .4;
        setDragId(ev.currentTarget.id);
    }

    const handleDragEnd = (ev) => {
        ev.target.style.opacity = '';
        setOverId(null);
    }

    const [overId, setOverId] = useState(null);

    const handleDrop = (ev) => {
        const dragBox = items.find((item) => item.id === parseInt(dragId));
        const remainingBoxes = items.filter((item) => item.id !== parseInt(dragId));

        let dropPosition = remainingBoxes.map(function (item) { return item.id; }).indexOf(parseInt(ev.currentTarget.id));

        remainingBoxes.splice(dropPosition, 0, dragBox)
        setItems(remainingBoxes);

        dispatch(updateOrderAsync({ drag_id: dragId, drop_id: ev.currentTarget.id }));
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className='dragtable'>
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

                        item.name.toLowerCase().indexOf(filter.value) > -1 || null === filter.value ? (<PantryItem
                            setOverId={setOverId}
                            handleDrag={handleDrag}
                            handleDrop={handleDrop}
                            handleDragEnd={handleDragEnd}
                            clName={overId === item.id ? 'dropIntend' : ''}
                            key={item.id} row={item} />
                        ) : null
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

import { useDispatch } from "react-redux";
import { deleteItemAsync, toggleStatusAsync } from "../redux/itemSlice";

import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom';
import { CardMedia, Checkbox, IconButton } from '@material-ui/core';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import Bookmark from '@material-ui/icons/Bookmark';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme) => {
    return {
        cardMedia: {
            objectFit: 'contain',
            height: theme.spacing(9),
        },
    }
});

export default function PantryItem({ row, handleDrag, handleDrop, handleDragEnd, setOverId, clName }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteItem = (deleteId) => {
        dispatch(deleteItemAsync({ id: deleteId }));
    };

    const toggleUseInList = (row) => {
        let status = row.use_in_list ? 0 : 1;
        dispatch(toggleStatusAsync({ id: row.id, field: 'use_in_list', status: status }));
    };

    const dragFeedback = (ev) => {
        ev.preventDefault()
        if (ev.type === 'dragover') {
            setOverId(parseInt(ev.currentTarget.id));
        } else {
            setOverId(null);
        }
    };

    return (
        <TableRow
            draggable={true}
            id={row.id}
            onDragStart={handleDrag}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onDragOver={dragFeedback}
            onDragLeave={dragFeedback}
            className={clName}
        >
            <TableCell component="th" scope="row">
                <Checkbox
                    aria-label="use in list" onClick={() => toggleUseInList(row)}
                    checked={row.use_in_list == 1}
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark />}
                />
            </TableCell>

            <TableCell component="th" scope="row">
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={row.image}
                    alt={row.name}
                />
            </TableCell>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.location} </TableCell>
            <TableCell >
                <IconButton aria-label="delete" onClick={() => deleteItem(row.id)}>
                    <Delete />
                </IconButton>

                <Link to={"/form/" + row.id}>
                <IconButton aria-label="edit">
                    <Edit />
                </IconButton>
                </Link>

            </TableCell>
        </TableRow>
    )
}

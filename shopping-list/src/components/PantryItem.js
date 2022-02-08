import { makeStyles } from '@material-ui/styles'

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

export default function PantryItem({ row }) {

    const classes = useStyles();

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Checkbox
                    // checked
                    icon={<BookmarkBorder />}
                    checkedIcon={<Bookmark />}
                />
            </TableCell>

            <TableCell component="th" scope="row">
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={'https://images.hannaford.com/GetImage.aspx?vector=fR46NeaI7CSRJCnzCVdqRONgRpRqCxtWAZbG+kWHrkke21xRZClo8jdaqitFi03g'}
                    alt="green iguana"
                />
            </TableCell>

            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>

            <TableCell align="right">{row.location}</TableCell>

            <TableCell >
                <IconButton aria-label="delete">
                    <Delete />
                </IconButton>
                <IconButton aria-label="edit">
                    <Edit />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

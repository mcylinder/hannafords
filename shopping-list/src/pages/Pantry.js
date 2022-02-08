
import PantryItem from '../components/PantryItem';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles((theme) => {
    return {

        cardMedia: {
            objectFit: 'contain',
            height: theme.spacing(9),
        },

    }
});

function createData(name, location) {
    return { name, location };
}

const rows = [
    createData('Frozen yoghurt1', '6A'),
    createData('Frozen yoghurt2', '6A'),
    createData('Frozen yoghurt3', '6A'),
    createData('Frozen yoghurt4', '6A'),
    createData('Frozen yoghurt5', '6A'),
    createData('Frozen yoghurt6', '6A'),
];

export default function Pantry() {

    const classes = useStyles();

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
                    {rows.map((row) => (
                        <PantryItem key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

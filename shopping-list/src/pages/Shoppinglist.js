import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import ListItem from '../components/ListItem';

import { useSelector, useDispatch } from 'react-redux';
import { getItemsAsync, updateOrderAsync } from '../redux/itemSlice';

export default function Shoppinglist() {

    const dispatch = useDispatch();
    const stateItems = useSelector((state) => state.items);
    const [items, setItems] = useState([]);

    const theme = useTheme();
    const gridContainer = {
        display: "grid",
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "repeat(5, 1fr)"
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "repeat(4, 1fr)"
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: "repeat(2, 1fr)"
        },
    };

    useEffect(() => {
        dispatch(getItemsAsync());
    }, [dispatch]);

    useEffect(() => {
        const shoppingList = stateItems.filter((item) => item.use_in_list);
        setItems(shoppingList);
    }, [stateItems]);

    const shopping_tiles = items.map((item) => {
        return (
            <ListItem item={item} key={item.id} />
        );
    })

    return (
        <div>
            <Box sx={gridContainer}>
                {shopping_tiles}
            </Box>
        </div>
    )
}

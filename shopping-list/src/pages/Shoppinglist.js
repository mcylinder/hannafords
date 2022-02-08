import React from 'react'

import { Box } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import ListItem from '../components/ListItem';


export default function Shoppinglist() {

    // const classes = useStyles();
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
            gridTemplateColumns: "repeat(3, 1fr)"
        },
    };

    const shopping_tiles = ['English Muffins', 'Salt', 'Bag of Arugula and long title here', 'Mushrooms', 'Selzer', 'English Muffins', 'Salt', 'Bag of Arugula', 'Mushrooms', 'Selzer', 'English Muffins', 'Salt', 'Bag of Arugula', 'Mushrooms', 'Selzer'

    ].map((item, ii) => {
        return (
            <ListItem item={item} key={ii} />

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

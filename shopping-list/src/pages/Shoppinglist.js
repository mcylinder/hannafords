import React from 'react'

import { Box, Card, CardMedia, createMuiTheme, Grid } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/styles'

const useStyles = makeStyles((theme) => {
    return {
        cardMedia: {
            objectFit: 'contain',
            [theme.breakpoints.up('lg')]: {
                height: theme.spacing(20)
            },
            [theme.breakpoints.down('md')]: {
                height: theme.spacing(20),
            },
            [theme.breakpoints.down('md')]: {
                height: theme.spacing(20),
            },
        },
        cardContent: {
            paddingBottom: theme.spacing(.5),
            "&:last-child": {
                paddingBottom: theme.spacing(.5),
            }
        },
        card: {
            margin: theme.spacing(1)
        },
        headline: {
            [theme.breakpoints.up('md')]: {
                fontSize: '1.3rem'
            },
            fontSize: '1rem'
        }
    }
});

export default function Shoppinglist() {

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

    const classes = useStyles();
    const test_img = ['https://images.hannaford.com/GetImage.aspx?vector=tgmLgEGqWy7oNDXOltTKqbOI0mZoybxdfnPtoW7oOghi4IZyK2wC0g==',
        'https://images.hannaford.com/GetImage.aspx?vector=fR46NeaI7CSRJCnzCVdqRONgRpRqCxtWAZbG+kWHrkke21xRZClo8jdaqitFi03g'];
    const test_data = [
        'English Muffins',
        'Salt',
        'Bag of Arugula and long title here',
        'Mushrooms',
        'Selzer',
        'English Muffins',
        'Salt',
        'Bag of Arugula',
        'Mushrooms',
        'Selzer',
        'English Muffins',
        'Salt',
        'Bag of Arugula',
        'Mushrooms',
        'Selzer'

    ].map((item, ii) => {
        return (
            <Card
                className={classes.card}
                key={ii}
            >
                <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={test_img[ii % 2]}
                    alt="green iguana"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="div" className={classes.headline}>
                        {item}
                    </Typography>
                    <Typography variant="overline" display="block" gutterBottom>
                        Aisle 6
                    </Typography>
                </CardContent>
            </Card>
        );
    })

    return (
        <div>
            <Box sx={gridContainer}>
                {test_data}
            </Box>
        </div>
    )
}

import { Card, CardMedia } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from "react-redux";
import { updateItemAsync } from "../redux/itemSlice";

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

export default function ListItem({ item }) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const toggleHave = (item) => {
        let newPut = !item.put_in_bask;
        let revisedValue = { ...item, put_in_bask: newPut, }
        dispatch(updateItemAsync(revisedValue));
    }

    return (
        <Card className={classes.card} style={{ 'opacity': `${item.put_in_bask ? .3 : 1}` }} onClick={() => toggleHave(item)}>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                image={item.image}
                alt={item.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="div" className={classes.headline}>
                    {item.name} 
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    {item.location}
                </Typography>
            </CardContent>
        </Card>
    )
}

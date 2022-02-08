import { Card, CardMedia } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

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

    return (
        <Card className={classes.card} >
            <CardMedia
                className={classes.cardMedia}
                component="img"
                image={'https://images.hannaford.com/GetImage.aspx?vector=tgmLgEGqWy7oNDXOltTKqbOI0mZoybxdfnPtoW7oOghi4IZyK2wC0g=='}
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
    )
}

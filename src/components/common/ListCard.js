import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import {
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";

export default function ListCard(props) {
  const theme = useTheme();
  const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
    card: {
      display: 'flex',
      height: '150px'
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  }));
  const classes = useStyles(theme);

  const post = {
    title: props.title,
    subtitle: props.subtitle,
    description: props.description,
    urlImage: props.urlImage
  }

  let { path, url } = useRouteMatch();
  
  return (
    <Grid item key={post.title} xs={12} md={6}>
      <Link to={`${url}/edit`}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.subtitle}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Editar
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={post.urlImage}
                title="Image title"
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}
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
  }
  
  return (
      <Grid item key={post.title} xs={12} md={6}>
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
                image="https://previews.123rf.com/images/alekseyvanin/alekseyvanin1704/alekseyvanin170400127/75320517-personne-ic%C3%B4ne-de-la-ligne-utilisateur-signe-de-vecteur-de-contour-pictogramme-lin%C3%A9aire-isol%C3%A9-sur-blanc-ill.jpg"
                title="Image title"
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
  );
}
    // <Paper className={classes.mainFeaturedPost}>
    //   {/* Increase the priority of the hero background image */}
    //   {
    //     <img
    //       style={{ display: 'none' }}
    //       src="https://source.unsplash.com/user/erondu"
    //       alt="background"
    //     />
    //   }
    //   <div className={classes.overlay} />
    //   <Grid container>
    //     <Grid item sm={6} md={6} lg={6}>
    //       <div className={classes.mainFeaturedPostContent}>
    //         <Typography component="h1" variant="h3" color="inherit" gutterBottom>
    //           Title of a longer featured blog post
    //         </Typography>
    //         <Typography variant="h5" color="inherit" paragraph>
    //           Multiple lines of text that form the lede, informing new readers quickly and
    //           efficiently about what&apos;s most interesting in this post&apos;s contents.
    //         </Typography>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </Paper>

// class ListCard extends React.Component {
  // classes = {
  //   paper: {
  //     backgroundColor: "#cfd8dc"
  //   }
  // }

  // render() {
    // return (
    //   <Paper className={this.classes.mainFeaturedPost}>
    //   {/* Increase the priority of the hero background image */}
    //   {
    //     <img
    //       style={{ display: 'none' }}
    //       src="https://source.unsplash.com/user/erondu"
    //       alt="background"
    //     />
    //   }
    //   <div className={this.classes.overlay} />
    //   <Grid container>
    //     <Grid item md={6}>
    //       <div className={this.classes.mainFeaturedPostContent}>
    //         <Typography component="h1" variant="h3" color="inherit" gutterBottom>
    //           Title of a longer featured blog post
    //         </Typography>
    //         <Typography variant="h5" color="inherit" paragraph>
    //           Multiple lines of text that form the lede, informing new readers quickly and
    //           efficiently about what&apos;s most interesting in this post&apos;s contents.
    //         </Typography>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </Paper>
    // <Paper className={this.classes.paper}>
    //   <Typography variant="h5" component="h3">
    //     This is a sheet of paper.
    //   </Typography>
    //   <Typography component="p">
    //     Paper can be used to build surface or other elements for your application.
    //   </Typography>
    // </Paper>
    // )
//   }
// }
// export default ListCard
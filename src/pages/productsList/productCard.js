import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const { addProductUnit, data } = props;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.img}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {props.titule}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {props.price}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Calificacion: ${props.classification ?? "N/A"}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={(e) => addProductUnit(data)}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}

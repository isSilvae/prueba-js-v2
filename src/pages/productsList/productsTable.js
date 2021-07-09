import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  rootTable: {
    height: "80vh",
    marginBottom: "0",
  },
  table: {
    height: "70vh",
  },
  button: {
    height: "10vh",
    width: "20%",
    margin: "0",
    position: "fixed",
    bottom: "40px",
    right: "40px",
  },
}));

export default function ProductsTable(props) {
  const { cart, deleteProduct, goToCart } = props;
  const classes = useStyles();
  let detaills = [];
  for (const property in cart) {
    const product = cart[property];
    const detaill = {
      name: product.data.titulo,
      units: product.units,
      id: property,
    };
    detaills = [...detaills, detaill];
  }
  return (
    <Grid item container xs={12}>
      <Grid item container xs={12}>
        <TableContainer component={Paper} className={classes.rootTable}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detaills.map((detaill) => (
                <TableRow key={detaill.id}>
                  <TableCell component="th" scope="row">
                    {detaill.name}
                  </TableCell>
                  <TableCell align="right">{detaill.units}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="eliminar producto"
                      component="span"
                      onClick={(e) => deleteProduct(detaill.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item container xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={goToCart}
          className={classes.button}
        >
          Pagar
        </Button>
      </Grid>
    </Grid>
  );
}

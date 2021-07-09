import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { priceFormatting } from "../../utils/functions";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ResumeTable(props) {
  const { cart } = props;
  const classes = useStyles();
  let detaills = [];
  let totalAmount = 0;
  for (const property in cart) {
    const product = cart[property];
    const total = product.data.valor_oferta_plano * product.units ?? 0;
    totalAmount = totalAmount + total;
    const detaill = {
      name: product.data.titulo,
      url: product.data.imagen,
      units: product.units,
      value: product.data.valor_oferta,
      total: total,
      id: product.data.id_descuento,
    };
    detaills = [...detaills, detaill];
  }
  return (
    <Grid item container xs={12}>
      <Grid item container xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Totales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detaills.map((detaill) => (
                <TableRow key={detaill.id}>
                  <TableCell component="th" scope="row">
                    <Grid container>
                      <Grid item container xs={4}>
                        <Avatar
                          variant="square"
                          alt={detaill.name}
                          src={detaill.url}
                          className={classes.large}
                        />
                      </Grid>
                      <Grid item container xs={8}>
                        {detaill.name}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="right">{detaill.units}</TableCell>
                  <TableCell align="right">{detaill.value}</TableCell>
                  <TableCell align="right">
                    {priceFormatting(detaill.total)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}>TOTAL</TableCell>
                <TableCell align="right">
                  {priceFormatting(totalAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

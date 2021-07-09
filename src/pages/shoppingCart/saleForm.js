import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function SaleForm(props) {
  const { form, validations, onChange, saveSale } = props;
  const validForm = validations.name && validations.email && validations.phone;
  return (
    <Grid item container xs={12} style={{ padding: 9 }}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos del pedido
        </Typography>
      </Grid>
      <Grid item container xs={12}>
        <TextField
          error={!validations.name}
          id="name"
          label="Nombre"
          value={form.name}
          onChange={onChange}
          helperText="Ingrese un nombre"
        />
      </Grid>
      <Grid item container xs={12}>
        <TextField
          error={!validations.email}
          id="email"
          label="Email"
          value={form.email}
          onChange={onChange}
          helperText="Ingrese un email correcto"
        />
      </Grid>
      <Grid item container xs={12}>
        <TextField
          error={!validations.phone}
          id="phone"
          label="Telefono"
          value={form.phone}
          onChange={onChange}
          helperText="Ingrese solo numeros"
        />
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <Button
          variant="contained"
          color="primary"
          disabled={!validForm}
          onClick={saveSale}
        >
          Confirmar pago
        </Button>
      </Grid>
    </Grid>
  );
}

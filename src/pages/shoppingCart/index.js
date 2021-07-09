import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ResumeTable from "./resumeTable";
import SaleForm from "./saleForm";
import Loader from "../../components/loader";
import { postSale } from "../../assets/API";
import {
  numberValidator,
  emailValidator,
  requiredValidator,
} from "../../utils/functions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function ShopingCart() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [postError, setPostError] = useState(false);
  const [validations, setValidations] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const cart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    setValidations({
      name: requiredValidator(form.name),
      email: emailValidator(form.email),
      phone: numberValidator(form.phone),
    });
  }, [form]);

  const onChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveSale = async () => {
    setLoading(true);
    const postReponse = await postSale(cart, form);
    setLoading(false);
    setOpen(true);
    if (postReponse) {
      setPostError(false);
    } else {
      setPostError(true);
    }
  };
  return (
    <Container>
      <Grid container>
        <Grid item container xs={9}>
          <ResumeTable cart={cart} />
        </Grid>
        <Grid item container xs={3}>
          <SaleForm
            form={form}
            validations={validations}
            onChange={onChange}
            saveSale={saveSale}
          />
        </Grid>
      </Grid>
      <Loader open={loading} />
      <Snackbar open={open} autoHideDuration={12000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={postError ? "faill" : "success"}>
          {postError
            ? "Ocurrio un error, intente más tarde"
            : "Su pedido fue realizado de manera satisfactoria"}
        </Alert>
      </Snackbar>
    </Container>
  );
}

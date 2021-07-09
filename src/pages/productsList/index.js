import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./productCard";
import ProductsTable from "./productsTable";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Loader from "../../components/loader";
import { getProducts, countProducts } from "../../assets/API";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";

export default function ProductsList() {
  const [order, setOrder] = useState("titule");
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const [productsNumber, setProductsNumber] = React.useState(0);
  let cart = JSON.parse(localStorage.getItem("cart"));
  const [dinamicCart, setDinamicCart] = React.useState(cart);
  window.addEventListener("storage", function (e) {
    cart = JSON.parse(localStorage.getItem("cart"));
  });
  let history = useHistory();
  const handleChange = (event) => {
    const newOrder = event.target.value;
    setOrder(newOrder);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setRowsPerPage(newValue);
    setPage(0);
  };

  const deleteProduct = (id) => {
    delete cart[id];
    localStorage.setItem("cart", JSON.stringify(cart));
    setDinamicCart(cart);
  };
  const addProductUnit = (data) => {
    const id = data.id_descuento;
    let product = cart ? cart[id] : null;
    if (product) product = { ...product, units: product.units + 1 };
    else {
      product = { units: 1, data };
    }
    const newCart = cart ? { ...cart, [id]: product } : { [id]: product };
    setDinamicCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const goToCart = () => {
    history.push("/pedidos");
  };

  const getProductsNumber = async (start, limit, sortCode) => {
    setLoading(true);
    const number = (await countProducts()) ?? 0;
    setProductsNumber(number);
    setLoading(false);
  };
  const loadProducts = async (start, limit, sortCode) => {
    setLoading(true);
    const productsResponse = (await getProducts(start, limit, sortCode)) ?? [];
    setProducts(productsResponse);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(page * rowsPerPage, rowsPerPage, order);
  }, [page, rowsPerPage, order]);

  useEffect(() => {
    getProductsNumber();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item container xs={12}>
        <Grid item container xs={2}>
          <Typography variant="h5" gutterBottom>
            Ordenar
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Select
            native
            value={order}
            onChange={handleChange}
            inputProps={{
              name: "age",
              id: "filled-age-native-simple",
            }}
          >
            <option value={"titule"}>Titulo</option>
            <option value={"lowerPrice"}>Menor precio</option>
            <option value={"higherPrice"}>Mayor precio</option>
            <option value={"bestGrade"}>Mejor calificacion</option>
          </Select>
        </Grid>
      </Grid>
      <Grid item container xs={9}>
        <Grid item container xs={12}>
          {products.map((product) => (
            <Grid item xs={4}>
              <ProductCard
                img={product.imagen}
                titule={product.titulo}
                price={product.valor_oferta}
                classification={product.calificaciones}
                addProductUnit={addProductUnit}
                data={product}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item container xs={12}>
          <TablePagination
            component="div"
            count={productsNumber}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <Grid item container xs={3}>
        <ProductsTable
          cart={dinamicCart}
          deleteProduct={deleteProduct}
          goToCart={goToCart}
        />
      </Grid>
      <Loader open={loading} />
    </Grid>
  );
}

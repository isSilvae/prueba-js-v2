// App Component
import axios from "axios";
import { encodeGetParams, saleBody } from "../utils/functions";

axios.defaults.baseURL = " http://localhost:3001";
export const getProducts = async (start, limit, sortCode) => {
  try {
    const resp = await axios.get(
      `/productos${encodeGetParams(start, limit, sortCode)}`
    );
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const countProducts = async () => {
  try {
    const resp = await axios.get(`/productos`);
    console.log(resp.data);
    const array = resp.data;
    return array.length;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const postSale = async (cart, form) => {
  try {
    const body = saleBody(cart, form);
    const resp = await axios.post("/pedidos", body);
    return resp.data;
  } catch (err) {
    // Handle Error Here
    return null;
  }
};

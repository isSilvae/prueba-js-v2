import validator from "validator";

export const priceFormatting = (number) => {
  const formatted = new Intl.NumberFormat("de-DE").format(number);
  return `$${formatted}`;
};

//query formatting funcions
const sortDictionary = {
  titule: { by: "titulo", order: "desc" },
  lowerPrice: { by: "valor_oferta_plano", order: "asc" },
  higherPrice: { by: "valor_oferta_plano", order: "desc" },
  bestGrade: { by: "calificaciones", order: "desc" },
  shorterDistance: { by: "", order: "asc" },
};

const encodeSort = (sortCode) => {
  const sortBody = sortDictionary[sortCode];
  const sortQuery = `&_sort=${sortBody.by}&_order=${sortBody.order}`;
  return sortQuery;
};

export const encodeGetParams = (start, limit, sortCode) => {
  const query = `?_start=${start}&_limit=${limit}${encodeSort(sortCode)}`;
  return query;
};
//body sale formating
export const saleBody = (cart, form) => {
  let totalAmount = 0;
  let productos = [];
  for (const property in cart) {
    const product = cart[property];
    const total = product.data.valor_oferta_plano * product.units ?? 0;
    totalAmount = totalAmount + total;
    const producto = {
      id: product.data.id_descuento,
      precio: product.data.valor_oferta,
      cantidad: product.units,
    };
    productos = [...productos, producto];
  }
  let body = {
    id: Date.now(),
    nombre: form.name,
    email: form.email,
    telefono: form.phone,
    total_a_pagar: totalAmount,
    productos: productos,
  };
  return body;
};
//validators
export const numberValidator = (txt) => {
  const isValid = validator.isNumeric(txt);
  return isValid;
};

export const txtValidator = (txt) => {
  const isValid = validator.isAlpha(txt);
  return isValid;
};

export const emailValidator = (txt) => {
  const isValid = validator.isEmail(txt);
  return isValid;
};

export const requiredValidator = (txt) => {
  const isValid = !validator.isEmpty(txt.trim());
  return isValid;
};

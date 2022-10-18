const headers = { "Content-Type": "application/json" };
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);
const headersAuth = { ...headers, Authorization: token };
export const loginAPI = (data) => {
  return fetch(`${process.env.REACT_APP_API}/admin/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

//product
export const getProduct = (page) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/products?page=${page}`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};
export const getProductAll = () => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/products/all`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const addProduct = (data) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/product`,
    {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const editProduct = (data, id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/product/${id}`,
    {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const deleteProduct = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/product/${id}`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};
//upload Image
export const uploadImage = (formData) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/upload`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  ).then((res) => res.json());
};
// order
export const getOrder = (page) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/orders?page=${page}`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const editOrder = (data, id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/order/${id}`,
    {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const deleteOrder = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/order/${id}`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const deleteAllOrder = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/orders/all`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

//coupon
export const getCoupon = (page) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/coupons?page=${page}`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const addCoupon = (data) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/coupon`,
    {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const editCoupon = (data, id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/coupon/${id}`,
    {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const deleteCoupon = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/admin/coupon/${id}`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

// userProduct
export const getProductsData = () => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/products/all`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

// cart
export const getAllCart = () => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/cart`,
    {
      method: "GET",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};
export const addCart = (data) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/cart`,
    {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};
export const editCart = (data, id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/cart/${id}`,
    {
      method: "PUT",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};
export const deleteCart = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/cart/${id}`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};
export const deleteAllCart = () => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/carts`,
    {
      method: "DELETE",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const enterCoupon = (data) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/coupon`,
    {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const submitOrder = (data) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/order`,
    {
      method: "POST",
      headers: headersAuth,
      body: JSON.stringify(data),
    }
  ).then((res) => res.json());
};

export const getOrderID = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/order/${id}`,
    {
      method: "get",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

export const payOrder = (id) => {
  return fetch(
    `${process.env.REACT_APP_API}/api/${process.env.REACT_APP_PATH}/pay/${id}`,
    {
      method: "post",
      headers: headersAuth,
    }
  ).then((res) => res.json());
};

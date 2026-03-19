export const BaseURL = "https://nextbuy-backend-lrt8.onrender.com"
//"http://localhost:8080";

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  frogot_password: {
    url: "/api/user/forgot-password",
    method: "PUT",
  },
  frogot_password_verification: {
    url: "/api/user/verify-password",
    method: "PUT",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "PUT",
  },
  refresh_token: {
    url: "/api/user/refresh-token",
    method: "POST",
  },
  user_details: {
    url: "/api/user/user-details",
    method: "GET",
  },
  logout: {
    url: "/api/user/logout",
    method: "GET",
  },
  upload_avatar: {
    url: "/api/user/upload-avatar",
    method: "PUT",
  },
  update_userDetails: {
    url: "/api/user/update-user",
    method: "PUT",
  },
  add_category: {
    url: "/api/category/add-category",
    method: "POST",
  },
  upload_image: {
    url: "/api/file/upload",
    method: "POST",
  },
  get_category: {
    url: "/api/category/get",
    method: "GET",
  },
  update_category: {
    url: "/api/category/update",
    method: "PUT",
  },
  delete_category: {
    url: "/api/category/delete",
    method: "DELETE",
  },

  create_subCategory: {
    url: "/api/subcategory/add-subcategory",
    method: "POST",
  },
  get_subCategory: {
    url: "/api/subcategory/get-subcategory",
    method: "GET",
  },
  delete_subCategory: {
    url: "/api/subcategory/delete-subcategory",
    method: "DELETE",
  },
  update_subCategory: {
    url: "/api/subcategory/update-subcategory",
    method: "PUT",
  },
  create_product: {
    url: "/api/product/create",
    method: "post",
  },
  get_product: {
    url: "/api/product/get",
    method: "post",
  },
  get_product_by_category: {
    url: "/api/product/get-product-by-category",
    method: "post",
  },
  get_product_by_category_and_subCategory: {
    url: "/api/product/get-product-by-category-and-subcategory",
    method: "post",
  },
  get_product_details: {
    url: "/api/product/get-product-details",
    method: "post",
  },
  update_product_details: {
    url: "/api/product/update-product-details",
    method: "put",
  },

  delete_product: {
    url: "/api/product/delete-product",
    method: "delete",
  },
  search_product: {
    url: "/api/product/search-product",
    method: "post",
  },
  addto_cart: {
    url: "/api/cart/create",
    method: "post",
  },
  getCart_item: {
    url: "/api/cart/get",
    method: "get",
  },
  updateCart_itemQty: {
    url: "/api/cart/update-qty",
    method: "put",
  },
  deleteCart_item: {
    url: "/api/cart/delete-cart-item",
    method: "delete",
  },
  createAddress: {
    url: "/api/address/create",
    method: "post",
  },
  getAddress: {
    url: "/api/address/get",
    method: "get",
  },
  updateAddress: {
    url: "/api/address/update",
    method: "put",
  },
  disableAddress: {
    url: "/api/address/disable",
    method: "delete",
  },
  CashOnDeliveryOrder: {
    url: "/api/order/cash-on-delivery",
    method: "post",
  },
  payment_url: {
    url: "/api/order/checkout",
    method: "post",
  },
  getOrderItems: {
    url: "/api/order/order-list",
    method: "get",
  },
  verifyPayment: {
    method: "post",
    url: "/api/order/verify-payment",
  },


};

export default summaryApi;

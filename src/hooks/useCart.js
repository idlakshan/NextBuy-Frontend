// // hooks/useCart.js
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   selectCartItems,
//   selectCartSummary,
//   fetchCartItems,
//   updateCartItemQty,
//   deleteCartItem,
//   addToCart
// } from '../store/slice/cartProductSlice';
// import { fetchAddresses } from '../store/slice/addressSlice';
// import { fetchOrders } from '../store/slice/orderSlice';
// import { useEffect } from 'react';

// export const useCart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const cartSummary = useSelector(selectCartSummary);
//   const user = useSelector((state) => state.user);
  
//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchCartItems());
//       dispatch(fetchAddresses());
//       dispatch(fetchOrders());
//     }
//   }, [user, dispatch]);
  
//   const updateCartItem = (id, qty) => {
//     dispatch(updateCartItemQty({ id, qty }));
//   };
  
//   const removeCartItem = (cartId) => {
//     dispatch(deleteCartItem(cartId));
//   };
  
//   const addItemToCart = (productId, quantity = 1) => {
//     dispatch(addToCart({ productId, quantity }));
//   };
  
//   return {
//     cartItems,
//     cartSummary,
//     updateCartItem,
//     removeCartItem,
//     addItemToCart
//   };
// };
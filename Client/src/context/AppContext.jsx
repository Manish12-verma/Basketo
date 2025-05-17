import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //fetch seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      }else{
        setIsSeller(false);
      }
    } catch{
      setIsSeller(false);
    }
  };  
  //fetch user Auth status
  const fetchUser = async () => {
        try {
           const {data } = await axios.get("/api/user/is-auth");
           if(data.success){
            setUser(data.user);
            setCartItems(data.user.cartItems);
            } 
        } catch {
          setUser(null)
        }
  }
  


  //fetch All products
  const fetchProducts = async () => {
      try {
           const {data} = await axios.get('/api/product/list');
            if(data.success){
              setProducts(data.products);
            }else{
               toast.error(data.message);
            }
      } catch (err) {
            toast.error(err.message);
      }
  };

  //add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] = cartData[itemId] + 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  //update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;

    setCartItems(cartData);
    toast.success("Item quantity updated");
  };

  //remove item from cart
  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  //Get cart items count
  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  //Get Cart total price
  const getCartTotal = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser(); 
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    setShowUserLogin,
    showUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeCartItem,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartTotal,
    axios,
    fetchProducts
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

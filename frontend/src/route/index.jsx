import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SearchPage from '../pages/SearchPage'
import App from "../App"
import Login from "../pages/Login";
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword"
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Addresses from "../pages/Addresses";
import CategoryPage from "../pages/CategoryPage"
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProductPage from "../pages/UploadProductPage";
import ProductPage from "../pages/ProductPage";
import AdminPermission from "../layouts/AdminPermission";
import ProductAdmin from "../pages/ProductAdmin";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../components/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Cancel from "../pages/Cancel";
import Success from "../pages/Success";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <App/>,
        children: [{
            index: true,
            element: <Home/>
        },
        {
            path: "search",
            element: <SearchPage/>
        },
        {
            path: "login",
            element: <Login/>
        },
        {
            path: "register",
            element: <Register />
        },
        {
            path: "forgot-password",
            element: <ForgotPassword/>
        },
        {
            path: "verification-otp",
            element: <OtpVerification/>
        },
        {
            path: "reset-password",
            element: <ResetPassword/>
        },
        {
            path: "user",
            element: <UserMenuMobile/>
        },
        {
            path: "dashboard",
            element: <Dashboard/>,
            children: [
                {
                    path: "profile",
                    element: <Profile/>
                },
                {
                    path: "myorders",
                    element: <MyOrders/>
                },
                {
                    path: "address",
                    element: <Addresses/>
                },
                {
                    path: "category",
                    element: <AdminPermission><CategoryPage/></AdminPermission>
                },
                {
                    path: "subcategory",
                    element: <AdminPermission><SubCategoryPage/></AdminPermission>
                },
                {
                    path: "upload-product",
                    element: <AdminPermission><UploadProductPage/></AdminPermission>
                },
                {
                    path: "product",
                    element: <AdminPermission><ProductAdmin/></AdminPermission>
                }
            ]
        },
        {
            path : ":category",
            children : [
            {
                path : ":subCategory",
                element : <ProductListPage/>
            }
            ]
        },
        {
            path: "product/:product",
            element: <ProductDisplayPage/>
        },
        {
            path : 'cart',
            element : <CartMobile/>
        },
        {
            path: 'checkout',
            element: <CheckoutPage/>
        },
        {
            path: 'cancel',
            element: <Cancel/>
        },
        {
            path: 'success',
            element: <Success/>
        }
    ]
    }
])

export default router
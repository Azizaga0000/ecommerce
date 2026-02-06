import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Shop from '../pages/Shop.jsx'
import Product from '../pages/Product.jsx'
import Register from '../pages/Register.jsx'
import { Routes, Route } from 'react-router-dom'
 
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="shop" element={<Shop />} />
                <Route path="products/:id" element={<Product />} />
            </Route>
        </Routes>
    )
}
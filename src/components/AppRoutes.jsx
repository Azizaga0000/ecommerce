import Layout from './Layout.jsx'
import Home from '../pages/Home.jsx'
import { Routes, Route } from 'react-router-dom'
 
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}
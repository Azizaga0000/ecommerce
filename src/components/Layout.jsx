import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
    return (
        <div className="app">
            <p>Header</p>
            <main style={{minHeight: "70vh"}}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
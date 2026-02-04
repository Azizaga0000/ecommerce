import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="app">
            <p>Header</p>
            <main style={{minHeight: "70vh"}}>
                <Outlet />
            </main>
            <p>Footer</p>
        </div>
    )
}
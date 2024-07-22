import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './base/Sidebar/SideBar';
import AdminProducts from './pages/AdminProducts/AdminProducts';
import Home from './pages/Home/Home';
import ProductsList from './pages/ProductList/ProductsList';

import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const NotFound = () => <h1>Page non trouvée</h1>

const App = () => {

    return (
        <React.StrictMode>
            <Router>
                <SideBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
        </React.StrictMode>
    )
}

export default App;
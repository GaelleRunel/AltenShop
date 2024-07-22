import { useState, useEffect } from 'react';
import Breadcrumb from '../../base/Breadcrumb/Breadcrumb';
import SearchBar from '../../base/Searchbar/SearchBar';
import User from '../../base/User/User';
import ProductCard from '../../components/ProductCard/ProductCard';
import useApiCall from '../../hooks/useApiCall';
import ProductType from '../../interfaces';
import './ProductList.css';

const ProductsList = () => {
    const { data, error, loading } = useApiCall('../../src/assets/products.json');
    const [dataProducts, setDataProducts] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('priceAsc');
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        if (data.data) {
            setDataProducts(data.data);
        }
    }, [data.data]);

    const sortItems = (items, criteria) => {
        switch (criteria) {
            case 'priceAsc':
                return items.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return items.sort((a, b) => b.price - a.price);
            case 'nameAsc':
                return items.sort((a, b) => a.name.localeCompare(b.name));
            case 'bestRating':
                return items.sort((a, b) => b.rating - a.rating);
            default:
                return dataProducts;
        }
    };

    const handleSortChange = (event) => {
        const criteria = event.target.value;
        setSortCriteria(criteria);
        if (criteria) {
            console.log(criteria)
            const sortedItems = sortItems([...dataProducts], event.target.value);
            setDataProducts(sortedItems);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="page">
            <User />
            <Breadcrumb />
            <div className="container w-50 m-auto bg-light text-center">
                <div className="row g-2">
                    <div className=" w-25">
                        <select className="form-select" onChange={handleSortChange}>
                            <option value={sortCriteria}>Sort By</option>
                            <option value="priceAsc">Increasing price</option>
                            <option value="priceDesc">Decreasing prices</option>
                            <option value="nameAsc">Name by A-Z</option>
                            <option value="bestRating">Best Rating</option>
                        </select>
                    </div>
                    <div className="w-75">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-white">
                                <i className="bi bi-search"></i>
                            </span>
                            <SearchBar onChange={e => setSearchString(e.target.value)} placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="container-list d-flex flex-wrap justify-content-around">
                    {dataProducts && dataProducts.filter((item =>
                        item.category.toLowerCase().includes(searchString)
                        || item.name.toLowerCase().includes(searchString)))
                        .map((prod: ProductType) =>
                            <ProductCard key={prod.id}
                                id={0}
                                code={''}
                                category={prod.category}
                                inventoryStatus={prod.inventoryStatus}
                                quantity={0}
                                name={prod.name}
                                description={prod.description}
                                rating={prod.rating}
                                price={prod.price}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsList;


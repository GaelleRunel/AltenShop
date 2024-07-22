import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../base/Breadcrumb/Breadcrumb';
import SearchBar from '../../base/Searchbar/SearchBar';
import User from '../../base/User/User';
import Button from '../../base/Button/Button';
import AddUpdateModal from '../../components/AddUpdateModal/AddUpdateModal';
import useApiCall from '../../hooks/useApiCall';
import ProductType from '../../interfaces';
// import { deleteProduct, addProduct, updateProduct } from '../../services/products-service';
import './AdminProducts.css';


const AdminProducts = () => {

    const { data, error, loading } = useApiCall('../../src/assets/products.json');
    const [dataProducts, setDataProducts] = useState(null);

    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");

    const [selectedIds, setSelectedIds] = useState([]);

    const [isOpen, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        if (data.data) {
            setDataProducts(data.data);
        }
    }, [data.data]);

    // Function to simulate deletion item by item - click trash on the line (no back recording)
    const handleDelete = (index: number) => {
        const newArray = data.data.filter((item, i) => i !== index);
        setDataProducts(newArray)
    }

    // DELETE function to be used when connecting to an API rest
    // const handleDelete = (index: number) => {
    //     try {
    //         deleteProduct(index);
    //         setDataProducts(dataProducts.filter(product => product.id !== index));
    //     } catch (error) {
    //         console.error('Error while deleting a product:', error);
    //     }
    // };

    const handleCheckboxChange = (id) => {
        setSelectedIds(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(itemId => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    // Function to simulate deletions of many items- click on checkboxes (no back recording)
    const handleManyDelete = () => {
        setDataProducts(prevItems => prevItems.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
    };


    // Open Modal for Adding or updating data
    const openModalForAdd = () => {
        setCurrentItem(null);
        setModalTitle('Add a product');
        setOpen(true);
    };

    const openModalForEdit = (item) => {
        setCurrentItem(item)
        setModalTitle('Update a product');
        setOpen(true);
    };

    // ADD New Product or UPDATE a product
    // Create an id by incrementing the last id from the database
    const getNextId = () => {
        const maxId = dataProducts?.reduce((max, item) => (item.id > max ? item.id : max), 0);
        return maxId + 1;
    };
    // Function to simulate adding of a product via the Form Modal
    const handleFormSubmit = (product) => {
        if (product.id) {
            setDataProducts(data.data.map(i => i.id === product.id ? product : i));
        } else {
            const id = getNextId();
            const newProductToAdd = { id, ...product };
            setDataProducts([...dataProducts, newProductToAdd]);
            setOpen(false);
        }
    }

    // ADD function to be used when connecting to an API rest
    // const handleAddProduct = async (newProduct) => {
    //     try {
    //         const id = getNextId();
    //         const newProductToAdd = { id, ...newProduct };
    //         const addedProduct = await addProduct(newProductToAdd);
    //         setDataProducts([...dataProducts, addedProduct]);
    //         setOpen(false);
    //     } catch (error) {
    //         console.error('Error while adding a product:', error);
    //     }
    // };


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
            <div className='page-content'>
                <div className="buttons-container">
                    <div className='buttons-left'>
                        <Button type='button' className='btn btn-success' onClick={openModalForAdd}>
                            <i className="fs-6 bi-plus-lg icon" /> New
                        </Button>
                        <Button type='button' className='btn btn-secondary' onClick={handleManyDelete}>
                            <i className="fs-6 bi-trash icon" /> Delete
                        </Button>
                    </div>
                    <Button type='button' className='btn btn-primary'>
                        <i className="fs-6 bi-gear icon" />
                    </Button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr className='grid'>
                            <th scope="col"></th>
                            <th scope="col" className='col-4'>code</th>
                            <th scope="col" className='col-4'>name</th>
                            <th scope="col" className='col-3'>Actions</th>
                        </tr>
                        <tr >
                            <th scope="row" className="bg-white"></th>
                            <td><SearchBar onChange={e => setSearchCode(e.target.value)} placeholder='' /></td>
                            <td><SearchBar onChange={e => setSearchName(e.target.value)} placeholder='' /></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProducts && dataProducts.filter((row =>
                            row.code.includes(searchCode)
                            && row.name.toLowerCase().includes(searchName)))
                            .map((prod: ProductType, index: number) =>
                                <tr key={index}>
                                    <th scope="row">
                                        <div className='form-check'>
                                            <input type="checkbox" name="check" id="" value={prod.id}
                                                checked={selectedIds.includes(prod.id)}
                                                onChange={() => { handleCheckboxChange(prod.id) }} />
                                        </div>
                                    </th>
                                    <td>{prod.code}</td>
                                    <td>{prod.name}</td>
                                    <td><i className="fs-6 bi-pencil icon" onClick={() => openModalForEdit(prod)}></i>
                                        <i className="fs-6 bi-trash icon" onClick={() => handleDelete(index)}></i>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <AddUpdateModal
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                    onSubmit={handleFormSubmit}
                    title={modalTitle}
                    item={currentItem}
                />
            </div>
        </div>
    )
}

export default AdminProducts;
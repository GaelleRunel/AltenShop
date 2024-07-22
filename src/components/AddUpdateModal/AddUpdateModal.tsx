import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './AddUpdateModal.css';

interface ModalPropsType {
	isOpen: boolean;
	onSubmit: ({ }) => void;
	onClose: () => void;
	title: string;
	item: any;
}

const AddUpdateModal: React.FC<ModalPropsType> = ({ isOpen, onClose, onSubmit, title, item }) => {

	const [newProduct, setNewProduct] = useState({
		code: '',
		name: '',
		description: '',
		price: '',
		quantity: '',
		inventoryStatus: '',
		category: '',
		image: '',
		rating: ''
	});

	useEffect(() => {
		if (item) {
			setNewProduct({
				code: item.code,
				name: item.name,
				description: item.description,
				price: item.price,
				quantity: item.quantity,
				inventoryStatus: item.inventoryStatus,
				category: item.category,
				image: item.image,
				rating: item.rating
			});
		} else {
			setNewProduct({
				code: '',
				name: '',
				description: '',
				price: '',
				quantity: '',
				inventoryStatus: '',
				category: '',
				image: '',
				rating: ''
			});
		}
	}, [item]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ ...newProduct, id: item ? item.id : null })
		console.log('new', newProduct)
		setNewProduct({
			code: '',
			name: '',
			description: '',
			price: '',
			quantity: '',
			inventoryStatus: '',
			category: '',
			image: '',
			rating: ''
		});
	};

	if (!isOpen) return null;
	return createPortal(

		<div className='modal'>
			<div className='modal-container'>
				<div className='modal-header'>
					<h1 className='modal-title fs-5'>{title}</h1>
					<button type='button' className='btn-close' onClick={onClose}></button>
				</div>
				<div className='modal-body'>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label htmlFor='code' className='form-label'>Code*</label>
							<input
								type='text'
								className='form-control'
								id='code'
								name='code'
								value={newProduct.code}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='name' className='form-label'>Name*</label>
							<input
								type='text'
								className='form-control'
								id='name'
								name='name'
								value={newProduct.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='description' className='form-label'>Description*</label>
							<input
								type='text'
								className='form-control'
								id='description'
								name='description'
								value={newProduct.description}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='price' className='form-label'>Price*</label>
							<input
								type='number'
								className='form-control'
								id='price'
								name='price'
								value={newProduct.price}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='quantity' className='form-label'>Quantity*</label>
							<input
								type='number'
								className='form-control'
								id='quantity'
								name='quantity'
								value={newProduct.quantity}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='inventoryStatus' className='form-label'>Inventory Status*</label>
							<input
								type='text'
								className='form-control'
								id='inventoryStatus'
								name='inventoryStatus'
								value={newProduct.inventoryStatus}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='category' className='form-label'>Category*</label>
							<input
								type='text'
								className='form-control'
								id='category'
								name='category'
								value={newProduct.category}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='image' className='form-label'>Image</label>
							<input
								type='text'
								className='form-control'
								id='image'
								name='image'
								value={newProduct.image}
								onChange={handleInputChange}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='rating' className='form-label'>Rating (on 5)</label>
							<input
								type='number'
								className='form-control'
								id='rating'
								name='rating'
								value={newProduct.rating}
								onChange={handleInputChange}
							/>
						</div>
						<div className='fs-6 fst-italic fw-light mb-2'>
							* fields required
						</div>
						<div className='modal-footer'>
							<button type='button' className='btn btn-secondary' onClick={onClose}>
								Close
							</button>
							<button type='submit' className='btn btn-primary'>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>,

		document.getElementById('modal')!
	);
}

export default AddUpdateModal;
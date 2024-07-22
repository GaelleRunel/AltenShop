const API_URL = 'http://localhost:3001/products';

export const deleteProduct = async (productId:number) => {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error while deleting product');
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error; 
  }
};

export const addProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Error while adding a product');
    }
    return await response.json(); 
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

export const updateProduct = async(product)=> {
  try {
    const response= await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Error while adding a product');
      }
    return await response.json(); 
  } catch (error) {
    console.error('Network error:', error);
    throw error;
    }
};
import Button from '../../base/Button/Button';
import ProductType from '../../interfaces';
import './ProductCard.css'

const ProductCard = ({ category, inventoryStatus, name, description, rating, price }: ProductType) => {

    const Stars = (rating: number | undefined) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= Math.round(rating)
                ? <i className="fs-6 bi-star-fill" />
                : <i className="fs-6 bi-star" />);
        }
        return stars;
    }

    return (
        <div className="card text-center mb-3 m-2">
            <div className="card-body p-4">
                <div className="category">
                    <i className="fs-6 bi-tag" />
                    <span>{category}</span>
                </div>
                <div className="stock mb-3">{inventoryStatus}</div>
                <div className="productName">{name}</div>
                <div className="productDescription">{description}</div>
                <div className="rating mb-3"> {Stars(rating)}</div>
                <div className="price d-inline me-2">{price} €</div>
                <Button type="button" className="btn btn-primary">
                    <i className="fs-6 bi-cart" />
                </Button>
            </div>
        </div>
    )
}

export default ProductCard;
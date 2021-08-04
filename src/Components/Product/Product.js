// React hooks
import { useEffect, useState } from 'react';

// Local imports
import getData from './libs/helpers/getData';
import { 
    handleAlertClose,
    handleColourChange,
    handleFormSubmit,
    handleQuantityChange
} from './libs/handlers';

// Styles
import './Product.css';


const Product = () => {
    // useState hooks
    const [isLoading, setIsLoading] = useState(true);
    const [productDetails, setProductDetails] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [alertFlag, setAlertFlag] = useState(false);
    const [basket, setBasket] = useState({});
    
    // Props
    const alertContent = `${basket?.quantity} ${basket?.color} ${productDetails?.title} added to basket!`;
    const imageSource = selectedImage?.image;
    const imageAlt = `Image of a ${selectedImage?.color} ${productDetails?.title}`;

    // Fetch data on first render and set initial state values
    useEffect(() => {
        getData('http://localhost:8000/product')
            .then(data => {
                const defaultImage = data?.colours?.find(image => image?.defaultImage);
                setProductDetails(data);
                setSelectedImage(defaultImage);
                setBasket({
                    color: defaultImage?.color,
                    quantity: 0
                });
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading && (
                <div className="o-product">
                    <div className="o-product__loading">Loading...</div>
                </div>
            )}  
            {!isLoading && (
                <div className="o-product">
                    {alertFlag && (
                        <div data-testid="alert-container" className="o-product__alert">
                            <h2 className="o-product__alert-heading">{alertContent}</h2>
                            <button data-testid="alert-close-button" className="o-product__alert-close" onClick={e => handleAlertClose(setAlertFlag)}>Close</button>
                        </div>
                    )}
                    <div className="o-product__head">
                        <img data-testid="product-image" className="a-image" alt={imageAlt} src={imageSource}></img>
                    </div>
                    <div className="o-product__body">
                        <form className="o-form" onSubmit={e => handleFormSubmit(e, setAlertFlag, setBasket, selectedImage, quantity)}> 
                            <div className="o-form__head">
                                <h1 className="a-heading">{productDetails?.title}</h1>
                            </div>
                            <div className="o-form__body">
                                <div className="m-form-item">
                                    <select 
                                        data-testid="colour-select"
                                        className="a-select" 
                                        aria-label="Colour"
                                        onChange={(e) => handleColourChange(e, setSelectedImage, productDetails)}
                                    >
                                        <option aria-label="Please select a colour" value="" disabled hidden>Colour</option>
                                        {productDetails?.colours?.length > 0 && 
                                            productDetails?.colours?.map((colour, index) => (<option key={index} value={colour?.color}>{colour?.color}</option>))
                                        }
                                    </select>
                                </div>
                                <div className="m-input-field">
                                    <label className="a-label" htmlFor="quantity-input">Quantity</label>
                                    <input 
                                        data-testid="quantity-input"
                                        id="quantity-input"
                                        className="a-input"
                                        type="text"
                                        min="1"
                                        step="1"
                                        aria-label="Enter a number"
                                        value={quantity}
                                        onChange={e => handleQuantityChange(e, setQuantity)}
                                    />
                                </div>
                                <div className="m-button">
                                    <button data-testid="submit-button" className="a-button" aria-expanded="false">
                                        <span className="a-button__text">Add to Basket</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        );
    }

    export default Product;
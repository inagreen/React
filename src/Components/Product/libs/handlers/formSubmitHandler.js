const handleFormSubmit = (e, setAlertFlag, setBasket, selectedImage, quantity) => {
    // Prevents the page from refreshing
    e.preventDefault();
    setBasket({
        color: selectedImage.color,
        quantity: quantity
    });
    setAlertFlag(true);
};

export default handleFormSubmit;
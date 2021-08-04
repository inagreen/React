const handleColourChange = (e, setSelectedImage, productDetails) => {
    const value = e.target.value;

    // Update selectedImage object with the selected colour option
    if (value) setSelectedImage(productDetails.colours.find(image => image.color === value));
    
    return null;
};

export default handleColourChange;
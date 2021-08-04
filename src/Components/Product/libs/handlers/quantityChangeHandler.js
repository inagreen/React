const handleQuantityChange = (e, setQuantity) => {
    const value = e.target.value

    setQuantity(value);

    return null;
};

export default handleQuantityChange;
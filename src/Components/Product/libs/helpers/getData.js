const getData = async (url) => {
    const data = await (await fetch(url)).json();

    return data;
}

export default getData;

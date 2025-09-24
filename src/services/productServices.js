
const API_BASE = 'https://fakestoreapi.com'

export const getProductData = async () => {
    try {
        const res = await fetch(`${API_BASE}/products`)
        if (!res.ok) throw new Error("PRODUCTS error");
        return await res.json();
    } catch(err) {
        console.error('Локальный файл тоже недоступен:', err.message);
        const localData = await import('../../public/data/products.json')
        return localData.default
    }
}
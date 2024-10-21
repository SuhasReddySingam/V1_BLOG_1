import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.title || !newProduct.authour || !newProduct.body) {
			return { success: false, message: "Error in creating blog please try again" };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	// createProduct: async (title,authour,body) => {
	// 	try {
	// 		await axios.post(`${API_URL}/create`, { title, authour,body });
	// 	} catch (error) {
	// 		set({ error: error.response.data.message || "Error",});
	// 		throw error;
	// 	}
	// },
	fetchProducts: async () => {
		const res = await fetch("/api/products/view");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));

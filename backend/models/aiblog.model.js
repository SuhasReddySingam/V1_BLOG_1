import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Blog = mongoose.model("Blog", productSchema);

export default Blog;
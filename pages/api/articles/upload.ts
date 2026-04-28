import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Increase the body size limit to allow for base64 image uploads
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "No image provided" });
        }

        // Upload the base64 image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "lizardinteractive/blogs", // Organizes uploads into this folder
        });

        res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ message: "Image upload failed" });
    }
}

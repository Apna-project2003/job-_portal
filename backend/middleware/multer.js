// import multer from  "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");



import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const singleUpload = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.error("❌ Multer error:", err);
            return res.status(400).json({
                success: false,
                message: "File upload failed",
            });
        }

        console.log("✅ File mila multer ko:", req.file ? req.file.originalname : "❌ File nahi aayi");
        next();
    });
};

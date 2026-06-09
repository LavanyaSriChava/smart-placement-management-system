exports.uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        res.json({
            message: "Resume received successfully",
            fileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
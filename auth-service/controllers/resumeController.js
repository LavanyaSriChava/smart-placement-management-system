const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const uploadFromBuffer = () => {
            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "resumes"
                    },
                    (error, result) => {

                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }

                    }
                );

                streamifier.createReadStream(req.file.buffer)
                    .pipe(stream);

            });
        };

        const result = await uploadFromBuffer();

        res.status(200).json({
            message: "Resume uploaded successfully",
            fileName: req.file.originalname,
            resumeUrl: result.secure_url
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Upload Failed",
            error: error.message
        });

    }
};
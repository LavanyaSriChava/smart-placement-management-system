const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const axios = require("axios");

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

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);

            });
        };

        const result = await uploadFromBuffer();

        // Save metadata in Spring Boot
        const resumeData = {
            studentId: 1, // temporary for testing
            fileName: req.file.originalname,
            resumeUrl: result.secure_url
        };

        const springResponse = await axios.post(
            "http://localhost:8080/api/resumes",
            resumeData
        );

        res.status(200).json({
            message: "Resume uploaded and saved successfully",
            cloudinaryUrl: result.secure_url,
            resumeRecord: springResponse.data
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Upload Failed",
            error: error.message
        });

    }
};
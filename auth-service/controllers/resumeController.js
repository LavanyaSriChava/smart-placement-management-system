const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const axios = require("axios");
const FormData = require("form-data");

exports.uploadResume = async (req, res) => {

    console.log("Logged in user:", req.user);

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const companyId = req.body.companyId;

        console.log("Company ID:", companyId);

        const uploadFromBuffer = () => {
            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "raw",
                        folder: "resumes"
                    },
                    (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }

                    }
                );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);

            });
        };

        console.log("1. Starting Cloudinary upload...");

        const result = await uploadFromBuffer();

        console.log("2. Cloudinary upload completed.");
        console.log("JWT Payload:", req.user);
console.log("Student ID being sent:", req.user.id);
        // Save metadata in Spring Boot
        const resumeData = {
            studentId: req.user.id,   // Use authenticated user's ID
            fileName: req.file.originalname,
            resumeUrl: result.secure_url
        };
console.log("Resume Data:", resumeData);
        console.log("3. Saving resume metadata...");

        const springResponse = await axios.post(
            process.env.RESUME_SERVICE_URL,
            resumeData
        );

        console.log("4. Resume metadata saved.");

        // ================= FastAPI Resume Upload =================

        console.log("5. Sending resume to FastAPI...");

        const form = new FormData();

        form.append(
            "file",
            req.file.buffer,
            req.file.originalname
        );

        const uploadResponse = await axios.post(
            `${process.env.FASTAPI_URL}/upload_resume`,
            form,
            {
                headers: form.getHeaders()
            }
        );

        console.log("6. Resume text extracted.");

        const resumeText = uploadResponse.data.resume_text;

        // ================= Fetch Company =================

        console.log("7. Fetching company...");

        const companyResponse = await axios.get(
            `http://localhost:8080/api/companies/${companyId}`
        );

        console.log("8. Company fetched.");

        const jobDescription = companyResponse.data.jobDescription;

        console.log("Job Description:");
        console.log(jobDescription);

        console.log("9. Calling AI analysis...");

        const analysisResponse = await axios.post(
            `${process.env.FASTAPI_URL}/analyze`,
            {
                resume_text: resumeText,
                job_description: jobDescription
            }
        );

        console.log("10. AI analysis complete.");

        return res.status(200).json({
            message: "Resume uploaded successfully",
            cloudinaryUrl: result.secure_url,
            resumeRecord: springResponse.data,
            analysis: analysisResponse.data
        });

    } catch (error) {

        console.error("========== Resume Upload Error ==========");

        console.error(error);

        if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
        }

        return res.status(500).json({
            message: "Upload Failed",
            error: error.message || "Unknown Error"
        });

    }
};
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
console.log("7. Fetching company...");

const companyResponse = await axios.get(
    `http://localhost:8080/api/companies/${companyId}`
);

console.log("8. Company fetched.");

const jobDescription =
    companyResponse.data.jobDescription;
console.log("9. Calling AI analysis...");
console.log("Resume Text:");
console.log(resumeText);

console.log("Company Response:");
console.dir(companyResponse.data, { depth: null });

console.log("Job Description:");
console.log(jobDescription);

console.log("Request to FastAPI:");
console.log({
    resume_text: resumeText,
    job_description: jobDescription
});

const analysisResponse = await axios.post(
    
    `${process.env.FASTAPI_URL}/analyze`,
    {
        resume_text: resumeText,
        job_description: jobDescription
    }
);

console.log("10. AI analysis complete.");
res.status(200).json({
    message: "Resume uploaded successfully",
    cloudinaryUrl: result.secure_url,
    resumeRecord: springResponse.data,
    analysis: analysisResponse.data
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Upload Failed",
            error: error.message
        });

    }
};
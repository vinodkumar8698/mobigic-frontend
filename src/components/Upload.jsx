import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FileUpload() {
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadMessage('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // if using JWT token for authentication
                },
            });
            setUploadMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage('Error uploading file. Please try again later.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button style={{ marginTop: "10px" }} onClick={() => navigate("/files")}>Show Upload Files</button>
            {uploadMessage && <p>{uploadMessage}</p>}
        </div>
    );
}

export default FileUpload;

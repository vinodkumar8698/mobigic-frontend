// components/FileList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FileList() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('authToken')
    const deleteFile = async (e, id) => {
        e.preventDefault();
        await axios.delete(`http://localhost:5000/api/files/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // if using JWT token for authentication
            },
        });
        alert("file deleted successfully");
        fetchFiles()
    }
    const fetchFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // if using JWT token for authentication
                },
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };
    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Files</h2>
            <ol>
                {files.map((file) => (
                    <li key={file._id} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                        - {file.fileName} - {file.code}<p style={{ cursor: "pointer", color: "red" }} onClick={(e) => deleteFile(e, file._id)}>Delete</p>
                    </li>
                ))}
            </ol>

            <h4 style={{ cursor: "pointer", color: "green" }} onClick={() => navigate("/upload")}>Upload File</h4>
        </div>
    );
}

export default FileList;

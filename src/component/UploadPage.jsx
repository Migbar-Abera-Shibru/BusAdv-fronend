// UploadPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 10px 0;
`;

const FileInput = styled.input`
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #5549cc;
  }
`;

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
        const response = await axios.post("http://localhost:5000/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            alert(response.data.message || "File uploaded, vectorized, and saved locally!");
            navigate("/chatbot"); // Redirect to chatbot page after successful upload
        } else {
            alert(response.data.error || "Error uploading file.");
        }
    } catch (error) {
        alert("Error uploading file. Please try again.");
    } finally {
        setLoading(false);
    }
};
  return (
    <Container>
      <Title>Upload PDF for Vectorization</Title>
      <FileInput type="file" accept="application/pdf" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </Container>
  );
};

export default UploadPage;
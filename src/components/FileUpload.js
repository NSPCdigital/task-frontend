import React, { useState } from 'react';

// UWAGA: Wstaw tu swoje dane AWS lub użyj presigned URL
const S3_BUCKET = 'YOUR_BUCKET_NAME';
const REGION = 'YOUR_REGION';
const ACCESS_KEY = 'YOUR_ACCESS_KEY';
const SECRET_ACCESS_KEY = 'YOUR_SECRET_KEY';

// Jeśli chcesz użyć presigned URL, zostaw powyższe puste i podaj URL w kodzie


function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus('Please select a file.');
      return;
    }
    setStatus('Uploading...');

    try {
      // 1. Get presigned URL from backend
      const res = await fetch(
        `/s3/presign?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      );
      if (!res.ok) {
        setStatus('Failed to get presigned URL.');
        return;
      }
      const data = await res.json();
      const presignedUrl = data.url;
      if (!presignedUrl) {
        setStatus('No presigned URL returned.');
        return;
      }

      // Obsługa trybu testowego
      if (presignedUrl.startsWith('TEST_URL_FOR_')) {
        setStatus('Test mode: backend zwrócił testowy link. Upload do S3 nie został wykonany.');
        return;
      }

      // 2. Upload file to S3 using presigned URL
      const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });
      if (!uploadRes.ok) {
        setStatus('Upload failed.');
        return;
      }
      setStatus('Upload successful!');
    } catch (err) {
      setStatus('Error: ' + err.message);
    }
  };

  return (
    <div style={{
      background: '#23293a',
      borderRadius: 12,
      padding: '2rem',
      margin: '2rem 0',
      boxShadow: '0 2px 12px #0002',
      maxWidth: 480,
      color: '#fff',
      fontFamily: 'inherit',
    }}>
      <h2 style={{marginBottom: '1.2rem', fontWeight: 700, fontSize: '1.4rem'}}>Upload file to S3</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18}}>
        <label htmlFor="file-upload" style={{
          background: '#2d3652',
          color: '#fff',
          padding: '0.5rem 1.2rem',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 500,
          border: '1px solid #3a4666',
          marginRight: 8,
        }}>
          Choose file
          <input id="file-upload" type="file" onChange={handleFileChange} style={{display: 'none'}} />
        </label>
        <span style={{color: file ? '#fff' : '#aaa', minWidth: 120, fontSize: '1em'}}>
          {file ? file.name : 'No file selected'}
        </span>
        <button onClick={uploadFile} style={{
          background: '#4fa1ff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '0.5rem 1.2rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background 0.2s',
        }}>Upload</button>
      </div>
      <div style={{marginTop: 8, minHeight: 24, color: status.startsWith('Upload') ? '#4fa1ff' : '#ffb347'}}>{status}</div>
      <div style={{fontSize:'0.97em',color:'#b0b8d8',marginTop:18, lineHeight: 1.6}}>
        <b>Configure AWS credentials or a presigned URL in <span style={{color:'#fff'}}>FileUpload.js</span>.</b><br/>
        <span style={{color:'#ffb347'}}>Recommended:</span> generate a presigned URL on your backend.<br/>
        See <span style={{color:'#fff'}}>INSTRUCTIONS_AWS_S3.md</span> for details.
      </div>
    </div>
  );
}

export default FileUpload;

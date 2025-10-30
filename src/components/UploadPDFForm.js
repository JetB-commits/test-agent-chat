import React, { useState, useEffect } from 'react';

function UploadPDFForm() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [selectedNum, setSelectedNum] = useState(1);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setError(null);
        if (!file) {
            setError('PDFファイルを選択してください');
            setIsLoading(false);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('collection_name', "user_17_7f4160ae");
            formData.append('embedding_model', "embed-v-4-0");
            const response = await fetch('https://upload-source-qdrant-281983614239.asia-northeast1.run.app/upload_pdf/', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setResult(data.isUploaded ? 'PDFアップロード成功' : 'PDFアップロード失敗');
        } catch (e) {
            setError('アップロードに失敗しました: ' + e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-form-container">
            <h2>PDFアップロード</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pdf-file">PDFファイルを選択:</label>
                    <input type="file" id="pdf-file" accept="application/pdf" onChange={handleFileChange} />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? '送信中...' : 'アップロード'}
                </button>
            </form>
            {result && <p className="success">{result}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default UploadPDFForm;

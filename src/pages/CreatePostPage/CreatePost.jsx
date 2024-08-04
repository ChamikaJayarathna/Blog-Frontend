import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './createPost.css'; 

const CreatePost = () => {
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({ images: [] });
    const [publishError, setPublishError] = useState(null);
    const quillRef = useRef(null);

    const navigate = useNavigate();

    const handleUploadImage = async () => {
        try {
            if (!files.length) {
                setImageUploadError('Please select at least one image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const uploadPromises = files.map((file) => {
                const fileName = new Date().getTime() + '-' + file.name;
                const storageRef = ref(storage, fileName);
                return uploadBytes(storageRef, file)
                    .then((snapshot) => getDownloadURL(snapshot.ref));
            });

            const imageUrls = await Promise.all(uploadPromises);
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...imageUrls]
            }));
        } catch (error) {
            setImageUploadError('Image upload failed');
            console.log(error);
        }
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                ['clean'],
            ],
        },
    };

    const formats = [
        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            setPublishError(null);
            navigate(`/post/${data.slug}`);
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className="create-post-style-container">
            <h1>Create a post</h1>

            <form onSubmit={handleSubmit}>
                <div className='create-post-style-title-category'>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        required
                        className="create-post-style-title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <select
                        className="create-post-style-category-select"
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="uncategorized">Category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </select>
                </div>

                <div className="create-post-style-baner-image">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setFiles(Array.from(e.target.files))}
                    />
                    <button
                        type="button"
                        className="create-post-style-upload-image-button"
                        onClick={handleUploadImage}
                    >
                        Upload Image
                    </button>
                </div>

                {imageUploadError && <div className="alert-danger" role="alert">{imageUploadError}</div>}
                {formData.images.length > 0 && (
                    <div>
                        {formData.images.map((url, index) => (
                            <img key={index} src={url} alt={`upload-${index}`} className="uploaded-image" />
                        ))}
                    </div>
                )}

                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    placeholder="Write something..."
                    required
                    modules={modules}
                    formats={formats}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    className="create-post-style-react-quill"
                />

                <button type="submit" className="create-post-style-publish-button">Publish</button>
                {publishError && <div className="alert-danger mt-4" role="alert">{publishError}</div>}
            </form>
        </div>
    );
};

export default CreatePost;

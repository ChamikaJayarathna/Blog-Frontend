import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    max-width: 600px;
    width: 100%;
`;

const Title = styled.input`
    width: 70%;
    max-width: 100%;
`;

const CategorySelect = styled.select`
    width: 25%;
`;

const Border = styled.div`
     border: 3px dotted #57CAF0;
`;

const ReactQuillStyled = styled(ReactQuill)`
    height: 100%;
    width: 100%;

    .ql-editor{
        font-size: 1.5rem;
    }
`;

const ProgressBarBox = styled.div`
    width: 50px;
    height: 50px;
`;

const CreatePost = () => {

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const quillRef = useRef(null);

    const navigate = useNavigate();

    const handleUploadImage = async ()=>{
        try {
            if(!file){
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);  
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL});
                    });
                }
            );

        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
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
            const res = await fetch('/api/post/create',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

  return (
    <Container className="p-3 mx-auto min-vh-100">
      <h1 className="text-center fs-3 my-4 fw-semibold">Create a post</h1>

      <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
        <div className="d-flex">
          <Title type="text" id="title" placeholder="Title" required className="form-control p-2 mx-auto" onChange={(e) => {
            setFormData({...formData, title: e.target.value})
          }}/>
          <CategorySelect className='form-select' name="" id="" onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option selected value="uncategorized">Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">Ract.js</option>
            <option value="nextjs">Next.js</option>
          </CategorySelect>
        </div>
        <Border className="d-flex gap-4 justify-content-center p-3 align-content-center">
            <input type="file" name="" id="" accept='image/*' className='' onChange={(e) => setFile(e.target.files[0])}/>
            <button type="button" className='btn btn-primary btn-sm p-2' onClick={handleUploadImage} disabled={imageUploadProgress}>
                {
                    imageUploadProgress ?
                    <ProgressBarBox>
                        <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                    </ProgressBarBox>
                    : ('Upload Image')
                }
            </button>
        </Border>
        {imageUploadError && <div className="alert alert-danger" role="alert">{imageUploadError}</div>}
        {formData.image && (
            <img src={formData.image} alt="upload" className='w-100 h-75 object-cover'/>
        )}

        <ReactQuillStyled
            ref={quillRef}
            theme="snow"
            placeholder="Write something..."
            required
            modules={modules}
            onChange={(value) => {
                setFormData({...formData, content: value});
            }}
        />

        <button type="submit" className='btn btn-success p-2 mt-5'>Publish</button>
        {publishError && 
            <div className="alert alert-danger mt-4" role="alert">{publishError}</div> 
        }
      </form>
    </Container>
  );
};

export default CreatePost;

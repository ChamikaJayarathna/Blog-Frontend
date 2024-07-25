import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
    height: 300px;

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

  return (
    <Container className="p-3 mx-auto min-vh-100">
      <h1 className="text-center fs-3 my-4 fw-semibold">Create a post</h1>

      <form className="d-flex flex-column gap-4">
        <div className="d-flex">
          <Title type="text" id="title" placeholder="Title" required className="form-control p-2 mx-auto"/>
          <CategorySelect className='form-select' name="" id="">
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

        <ReactQuillStyled theme="snow" placeholder='Write something...' className='mb-5' required/>
         <button type="submit" className='btn btn-success p-2'>Publish</button>
      </form>
    </Container>
  );
};

export default CreatePost;

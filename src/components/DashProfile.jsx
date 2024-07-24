import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const Card = styled.div`
  width: 700px;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`;

const Imgdiv = styled.div`
  width: 8rem; 
  height: 8rem;
  position: relative;
`;



const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }

  }

  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  }, [imageFile]);


  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        }) 
      }
    ); 
  }




  return (
    
    <div className="mt-5 mx-auto">
      <Card className='card'>
        <h1 className='my-4 text-center fw-semibold fs-3'>Profile</h1>

        <form className='d-flex flex-column align-items-center w-100 gap-4'>
          <input type="file" accept='image/*' name="" id="" onChange={handleImageChange} ref={filePickerRef} hidden/>
          <Imgdiv className='mb-3' onClick={() => filePickerRef.current.click()}>

            {imageFileUploadProgress && (
              <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
              />
            )}

            <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-circle w-100 h-100 border border-5 object-fit-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`}/>
          </Imgdiv>

          {imageFileUploadError && (
            <div className="alert alert-danger" role="alert">
              {imageFileUploadError}
            </div>
          )}


          <input type="text" id="username" placeholder="username" defaultValue={currentUser.username} className="form-control rounded" />
          
          <input type="email" id="email" placeholder="email" defaultValue={currentUser.email} className="form-control rounded" />
          
          <input type="password" id="password" placeholder="password" className="form-control rounded mb-4" />

          <button type="submit">Update</button>
        </form>

        <div className="d-flex justify-content-between text-danger mt-3">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>

      </Card>
    </div>

  )
}

export default DashProfile;
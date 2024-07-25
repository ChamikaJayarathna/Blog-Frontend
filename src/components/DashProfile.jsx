import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { Modal } from 'react-bootstrap';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  width: 700px;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px){
    width: 90%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.5rem;
  }
`;

const Imgdiv = styled.div`
  width: 8rem;
  height: 8rem;
  position: relative;

  @media (max-width: 480px) {
    width: 6rem;
    height: 6rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border: none;
  background-color: #D74B1F;
  color: #ffffff;
  border-radius: 5px;

  &:hover{
    background-color: #eb592d;
  }

  @media (max-width: 480px) {
    padding: 8px 0;
  }
`;

const DashProfile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
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
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () =>{
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserFailure(error.message));
        navigate('/sign-in');
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  // const handleDeleteUser = async () => {
  //   setShowModal(false);
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //       headers: {
  //       },
  //     });
  //     const data = await res.json();
  
  //     if (!res.ok) {
  //       console.error('Error deleting user:', data);
  //       dispatch(deleteUserFailure(data.message || 'An error occurred while deleting your account'));
  //     } else {
  //       console.log('User deleted successfully');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };
  
  

  return (
    <div className="mt-5 mx-auto">
      <Card className='card'>
        <h1 className='my-4 text-center fw-semibold fs-3'>Profile</h1>

        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center w-100 gap-4'>
          <input type="file" accept='image/*' name="" id="" onChange={handleImageChange} ref={filePickerRef} hidden />
          <Imgdiv className='mb-3' onClick={() => filePickerRef.current.click()}>
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
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

            <img src={imageFileUrl || currentUser.profilePicture} alt="user" className={`rounded-circle w-100 h-100 border border-5 object-fit-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`} />
          </Imgdiv>

          {imageFileUploadError && (
            <div className="alert alert-danger" role="alert">
              {imageFileUploadError}
            </div>
          )}

          <input type="text" id="username" placeholder="username" defaultValue={currentUser.username} className="form-control rounded" onChange={handleChange} />
          
          <input type="email" id="email" placeholder="email" defaultValue={currentUser.email} className="form-control rounded" onChange={handleChange} />
          
          <input type="password" id="password" placeholder="password" className="form-control rounded mb-4" onChange={handleChange} />

          <Button type="submit">Update</Button>
        </form>

        <div className="d-flex justify-content-between text-danger mt-3">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </Card>
      {updateUserSuccess && (
        <div className="alert alert-success mt-4" role="alert">
          {updateUserSuccess}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="md" centered>
        <Modal.Header closeButton className='border-0' />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-25 w-25 text-secondary mb-4 mx-auto'/>
            <h3 className='mb-5 text-secondary'>Are you sure you want to delete your account?</h3>
            <div className="d-flex justify-content-center gap-4">
              <button className='btn btn-danger' onClick={handleDeleteUser}>
                Yes, I'm sure
              </button>
              <button className='btn btn-secondary' onClick={() => setShowModal(false)}>
                No, cancle
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProfile;

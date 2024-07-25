import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const CreatePost = () => {
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
            <input type="file" name="" id="" accept='image/*' className=''/>
            <button type="button" className='btn btn-primary btn-sm p-2'>Upload image</button>
        </Border>

        <ReactQuillStyled theme="snow" placeholder='Write something...' className='mb-5' required/>
         <button type="submit" className='btn btn-success p-2'>Publish</button>
      </form>
    </Container>
  );
};

export default CreatePost;

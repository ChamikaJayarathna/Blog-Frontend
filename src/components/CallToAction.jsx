import React from 'react';

const CallToAction = () => {
  return (
    <div className='d-flex flex-row p-3 border border-info-subtle justify-content-center align-items-center rounded-5 text-center'>
        <div className="d-flex flex-column justify-content-center flex-grow-1 me-3">
            <h2 className='fs-4'>Want to learn more about JavaScript?</h2>
            <p className='text-muted my-2'>Checkout these resources with 100 JavaScript Projects</p>
            <button type="button" className='btn btn-primary rounded-top'>
                <a href="https://www.100jsprojects.com" className='text-white text-decoration-none' target='_blank' rel='noopener noreferrer'>100 JavaScript Projects</a>
            </button>
        </div>
        <div className="p-4">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" alt="" style={{width: '500px', height: '300px'}}/>
        </div>
    </div>
  )
}

export default CallToAction;
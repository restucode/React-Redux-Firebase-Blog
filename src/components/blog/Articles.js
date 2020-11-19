import React from 'react'
import Navbar from '../layout/Navbar'
import gambar from '../../assets/gambar.jpg'
import { Link } from 'react-router-dom'
const Articles = () => {
    return (
      <>
       <Navbar />
       <div className="row mt-3">
           <div className="col-sm-12 col-md-6 col-lg-4">
             <div className="card shadow mb-5 bg-white rounded" style={{width: '100%'}}>
                <img src={gambar} className="card-img-top" alt="..." />
                <div className="card-body text-decoration-none text-dark">
                    <h3 className="card-title">
                        <Link className='text-decoration-none text-dark' to='/'>Card title</Link>
                    </h3>
                    <p className="card-text">
                        <Link className='text-decoration-none text-dark' to='/'>Some quick example text to build on the card title and make up the bulk of the card's content.</Link>
                    </p>
                    <div className='d-flex justify-content-end align-items-center'>
                        <Link className="badge badge-dark mx-1" to='/'>Anime</Link>
                    </div>
                </div>
            </div>
           </div>
       </div>
      </>
    )
}

export default Articles

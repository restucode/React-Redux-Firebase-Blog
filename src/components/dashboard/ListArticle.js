import React from 'react'
import { Link } from 'react-router-dom'
import gambar from '../../assets/gambar.jpg'

const ListArticle = () => {
    return (
       <div className="container">
           <div className="row">
               <div className="col-12 mb-3">
                   <Link className='btn btn-primary w-100' to='/dashboard/tambah-artikel'>Tambah Artikel</Link>
               </div>
               <div className="col-sm-12 col-md-6 col-lg-4">
                <Link to='/dashboard/edit-artikel' className='text-decoration-none text-dark'>
                <div className="card shadow mb-5 bg-white rounded" style={{width: '100%'}}>
                        <img src={gambar} className="card-img-top" alt="..." />
                        <div className="card-body text-decoration-none text-dark">
                            <h3 className="card-title">Hello</h3>
                            <div className='d-flex justify-content-end align-items-center'>
                                <span className="badge badge-dark mx-1">Anime</span>
                            </div>
                        </div>
                    </div>
                </Link>
             </div>
           </div>
       </div>
    )
}

export default ListArticle

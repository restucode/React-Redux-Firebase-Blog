import React from 'react'
import { Link } from 'react-router-dom'
import gambar from '../../assets/gambar.jpg'
import { useSelector } from 'react-redux';
import {  useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../layout/Loading';
import { tanggalIndonesia } from './../../config/tanggalIndonesia';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useFirestore } from 'react-redux-firebase'

const ListArticle = () => {
    const firestore = useFirestore()
    
    useFirestoreConnect([
        { collection: "Articles", orderBy: ["createdAt", "desc"] },
    ]);
    
    const articles = useSelector((state) => state.firestore.ordered.Articles)
    
    if (!articles) {
        return <Loading />
    }
    

    const handleDelete =  (id) => {
    confirmAlert({
        title: 'Konfirmasi',
        message: 'Apakah Kamu Yakin Ingin Menghapus ?',
        buttons: [
            {
               label: 'Ya',
               onClick: async () => {
                try{
                    await firestore.collection("Articles").doc(id).delete();
                } catch(err) {
                    console.error("Dokumen Gagal Dihapus ", err);
                }
               }
            },
            {
            label: 'Tidak',
            }
        ]
        });
    }


    return (
       <div className="container">
           <div className="row">
               <div className="col-12 mb-3">
                   <Link className='btn btn-primary w-100' to='/dashboard/tambah-artikel'>Tambah Artikel</Link>
               </div>
               {
                articles.map(article => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={article.id}>
                    <div className="card shadow mb-5 bg-white rounded position-relative" style={{width: '100%'}}>
                        <img src={gambar} className="card-img-top" alt="..." />
                        <div className='position-absolute w-100 d-flex justify-content-between align-items-center'>
                            <span className={`badge badge-${ article.status ? 'success' : 'warning' } mt-1 ml-1`}>
                                { article.status ? 'Dipublikasikan' : 'Ditunda' }
                            </span>
                            <span className={`badge badge-light mt-1 mr-1`}>
                            {tanggalIndonesia(article.createdAt && article.createdAt.toDate())}
                            
                            </span>
                        </div>
                        
                        <div className="card-body text-decoration-none text-dark">
                            <Link className="text-decoration-none text-dark" to={`/dashboard/edit-artikel/${article.id}`}>
                                <h3 className="card-title">{ article.judul }</h3>
                            </Link>
                            
                            <div className='d-flex justify-content-end align-items-center'>
                                {
                                    article.kategori.map((kategori, index) => (
                                        <span className="badge badge-dark mx-1" key={index}>{kategori.value}</span>
                                    ))
                                }
                                
                            </div>

                            <button className='w-100 btn btn-danger mt-4' onClick={() => handleDelete(article.id)}>Hapus Artikel</button>
                        </div>
                    </div>
                </div>
                   ))
               }
                
           </div>
       </div>
    )
}

export default ListArticle

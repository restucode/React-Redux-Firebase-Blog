import React from 'react'
import Navbar from '../layout/Navbar'
import gambar from '../../assets/gambar.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../layout/Loading';
import SkeletonArticle from './../../skeletons/SkeletonArticle';


const Articles = () => {
    const firestore = useFirestore()
    const articles = useSelector((state) => state.firestore.ordered.Articles)
    useFirestoreConnect([
        { collection: "Articles", orderBy: ["createdAt", "desc"] },
    ]);
    
    const articlesFilter = articles && articles.filter(article => article.status === true)

    return (
      <>
       <Navbar />
       <div className="container">
        <div className="row mt-3">
        
          {
            articlesFilter && articlesFilter.length ? (
              articlesFilter.map(article => (
              <div className="col-sm-12 col-md-6 col-lg-4" key={article.id}>
              <div className="card shadow mb-5 bg-white rounded" style={{width: '100%'}}>
                  <img src={gambar} className="card-img-top" alt="..." />
                  <div className="card-body text-decoration-none text-dark">
                      <h3 className="card-title">
                          <Link className='text-decoration-none text-dark' to={`/${article.url}`}>{article.judul}</Link>
                      </h3>
                      <p className="card-text">
                          <Link className='text-decoration-none text-dark' to={`/${article.url}`}>Some quick example text to build on the card title and make up the bulk of the card's content.</Link>
                      </p>
                      <div className='d-flex justify-content-end align-items-center'>
                          {
                            article.kategori.map((kategori, index) => (
                              <span className="badge badge-dark mx-1" key={index}>{kategori.value}</span>
                            ))
                          }
                        
                      </div>
                  </div>
              </div>
            </div>
            ))
            ) : (
                <div className="container">
                  <div className="row mx-lg-n2">
                    { !articlesFilter && [1,2,3,4,5,6].map((n) => <SkeletonArticle key={n} />)}
                  </div>
                
                </div>
            
            )
          }
            
        </div>
       </div>

      </>
    )
}

export default Articles

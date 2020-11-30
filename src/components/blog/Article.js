import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import { tanggalIndonesia } from './../../config/tanggalIndonesia'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux';
import Loading from './../layout/Loading';
import {  useFirestoreConnect } from 'react-redux-firebase';


const Article = () => {
    //  Versi Callback 
    // const loadArticle = useCallback(() => {
    //     try {
    //         docRef
    //         .get()
    //         .then((snapshot) => {
    //             const data = snapshot.docs.map((doc) => ({
    //             ...doc.data(),  
    //             }));
    //             const dataBaru = data.find(tes => tes.url === url)
    //             setArticle(dataBaru)
    //         });
    //     } catch(err) { 
    //         console.log('Gagal Mengambil Artikel !', err)
    //     }
    // }, [docRef, url])

    // useEffect(() => {
    //     loadArticle()

    //     return () => loadArticle()
        
    //    }, [url,loadArticle])

    // pake useselector
    const { url } = useParams() 
    const articles = useSelector((state) => state.firestore.ordered.Articles)
    useFirestoreConnect([
        { collection: "Articles", orderBy: ["createdAt", "desc"] },
    ]);
    if (!articles) {
        return <Loading />
    }

    const article = articles.find(article => article.url === url)
    const tanggalArtikel = article.createdAt && article.createdAt.toDate()
 
    return (
        <>
        <Navbar />
        
        <hr/>
        <div className="row mt-3">
            <div className="col-md-8 offset-md-2">
                <h1 className='h2 pb-3'>{article.judul}</h1>
                <div className='d-flex flex-column pb-3'>
                    <span><span className='text-black-50 pr-1'>{`${article.penulis && 'Dipublikasikan Oleh'}`}</span>{ article.penulis }</span>
                    <span>{ tanggalIndonesia(tanggalArtikel) }</span>
                    <div className='pt-1'>
                    {
                     article.kategori.map((kategori, index) => (
                        <span className='badge badge-dark mr-1' key={index}>{ kategori.label }</span>
                     ))
                    }
                    </div>
                </div>
                <div className='articleku'>
                {parse(article.konten)}
                </div>
            </div>
        </div>
        </>
    )
}

export default Article

import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import { useFirestore } from 'react-redux-firebase'
import { tanggalIndonesia } from './../../config/tanggalIndonesia'
import parse from 'html-react-parser'
import Loading from '../layout/Loading'

const Article = () => {
    const firestore = useFirestore()
    const [ article, setArticle ] = useState({
        penulis : '',
        judul:'',
        url: '',
        konten: '',
        status : false,
        kategori : [],
    })
    const { id } = useParams()
    const docRef = firestore.collection('Articles')
    const tanggalArtikel = article.createdAt && article.createdAt.toDate()

    useEffect(() => {
     loadArticle()
    }, [id])

    const loadArticle =  async () => {
        try {
            docRef
            .get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                }));
                const dataBaru = data.find(tes => tes.url == id)
                setArticle(dataBaru)
            });
        } catch(err) { 
            console.log('Gagal Mengambil Artikel !', err)
        }
    }

    

    return (
        <>
        <Navbar />
        
        <hr/>
        <div className="row mt-3">
            <div className="col-md-8 offset-md-2">
                <h1 className='h2 pb-3'>{article.judul}</h1>
                <div className='d-flex flex-column pb-3'>
                    <span><span className='text-black-50 pr-1'>Dipublikasikan Oleh</span>{ article.penulis }</span>
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
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vel architecto mollitia delectus rerum ad enim tenetur illum sint dolores voluptatem illo reprehenderit quidem animi eveniet voluptates, sapiente perferendis aspernatur? Quod ratione natus modi adipisci aliquid perspiciatis velit tenetur quo dicta minima vel quas, quae nam qui magni dolorem voluptate nulla! Necessitatibus sint optio autem fuga possimus suscipit maiores debitis at. Ipsa nihil enim mollitia totam ea repudiandae illo quibusdam molestiae ipsum earum iure dolor odio saepe optio facere deserunt voluptatum temporibus fuga, nam culpa? Illum, placeat cupiditate. Facere, eaque molestiae cupiditate consequatur explicabo minima nisi commodi dolor debitis ipsum.</p>
                {parse(article.konten)}
                </div>
            </div>
        </div>
        </>
    )
}

export default Article

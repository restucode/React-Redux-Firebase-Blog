import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NavbarDashboard from '../layout/NavbarDashboard';
import CreatableSelect from 'react-select/creatable'
import { useParams, useHistory } from 'react-router-dom';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import Loading from './../layout/Loading';



const EditArticle = () => {

  const [ konten, setKonten ] = useState('')
  const [ article, setArticle ] = useState({
    penulis : '',
    judul:'',
    url: '',
    konten: '',
    status : false,
    kategori : [],
  })
  const [ kategori, setKategori ] = useState([])
    const [ btnPublish, setBtnPublish ] = useState(false)
    const firestore = useFirestore()
    const history = useHistory()
    const { id } = useParams()
    const docRef = firestore.collection('Articles').doc(id)
    useFirestoreConnect([
      { collection: "Category", orderBy: ["kategori", "desc"] },
    ]);
    const category = useSelector((state) => state.firestore.ordered.Category)

    useEffect(() => {
      if (id) {
         loadArticle();
      }
    }, [id]);

    const loadArticle = async () => {
      try {
        const result = await docRef.get()
        if(result.exists) {
           setKategori(result.data().kategori)
           setArticle(result.data())
        } else {
          console.log("Data Tidak Tersedia!");
        }

      } catch(err) {
        console.log("Gagal Mengambil Data !:", err);
      }
    }


    const handleCategory = (newValue) => {
      setKategori(newValue)
    }

    const createArticleSchema = yup.object({
      judul : yup.string()
          .required('Judul Tidak Boleh Kosong !'),
      url : yup.string()
          .required('URL Tidak Boleh Kosong !')
          .matches(/^[a-z-A-Z-0-9\s]+$/, 'URL Hanya Boleh Huruf dan Angka !'),
    })

    if(!category) return <Loading />

   

    return (
        <>
        <NavbarDashboard />
        <div className='container'>
            <div className="row">
                <div className="col-12 mt-3">
                  <Formik 
                    initialValues={article}
                    enableReinitialize
                    validationSchema={createArticleSchema}
                    onSubmit={ async (values, actions) => {
                      values.status = true
                      values.konten = konten
                      values.kategori = kategori
                      const dataBaru = kategori.map(data => {
                        const key = '__isNew__'
                        delete data[key]
                        return data
                      })

                      if(btnPublish) {

                        console.log(dataBaru)
                        if(id) {
                          try {
                            await docRef.update({
                              ...article,
                              judul: values.judul,
                              url: values.url,
                              konten: values.konten,
                              kategori: dataBaru,
                              penulis: values.penulis,
                              status: values.status,
                              updatedAt: firestore.FieldValue.serverTimestamp()
                            }).then(() => {
                              return history.push('/dashboard')
                            })
                          } catch(err) {
                            console.error("Dokumen Gagal diupdate: ", err);
                          }
                        }
                      }
                     
  
                    }}
                  >
                  { props => (
                 
                    <div>
                      <form onSubmit={props.handleSubmit}>
                      <div className="form-group">
                          <input type="text" className="form-control" placeholder="Judul Artikel" 
                             onChange={props.handleChange('judul')}
                             onBlur={props.handleBlur('judul')} 
                             value={props.values.judul}
                          />
                          <small className="form-text text-danger">{ props.touched.judul && props.errors.judul }</small>
                      </div>
                      <div className="form-group">
                          <input type="text" className="form-control" placeholder="URL Artikel" 
                              onChange={props.handleChange('url')}
                              onBlur={props.handleBlur('url')} 
                              value={props.values.url}
                          />
                          <small className="form-text text-danger">{ props.touched.url && props.errors.url }</small>
                      </div>
                      <div className="form-group">
                        <CKEditor
                          editor={ClassicEditor}
                          data={props.values.konten}
                          onChange={(event, editor) => {
                              const data = editor.getData()
                              setKonten(data)
                          }}
                        />
                    
                      </div>
                      <div className="form-group">
                        <CreatableSelect
                            isMulti
                            onChange={handleCategory}
                            options={category[0].kategori}
                            value={kategori}
                        />
                      </div>
                      <button type='submit' className='btn btn-success w-100 mb-4 publish' onClick={() => setBtnPublish(true)}>Publikasikan</button>
                      </form>
                    </div>

                  )}
                  </Formik>
              
                </div>
            </div>
      </div>
        </>

    )
}

export default EditArticle

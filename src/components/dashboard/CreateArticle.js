import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CreatableSelect from 'react-select/creatable'
import NavbarDashboard from '../layout/NavbarDashboard'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useFirestore, useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Loading from './../layout/Loading';

const CreateArticle = () => {
    const firestore = useFirestore()
    const history = useHistory()
    const firebase = useFirebase()
    useFirestoreConnect([
      { collection: "Category", orderBy: ["kategori", "desc"] },
      { collection: "Articles", orderBy: ["createdAt", "desc"] },
    ]);
    const category = useSelector((state) => state.firestore.ordered.Category)
    const articles = useSelector((state) => state.firestore.ordered.Articles)
    const [ konten, setKonten ] = useState('')
    const [ kategori, setKategori ] = useState([])
    const [ errorKonten, setErrorKonten ] = useState('')
    const [ errorKategori ] = useState('')
    const [ btnSimpan, setBtnSimpan ] = useState(false)
    const [ btnPublish, setBtnPublish ] = useState(false)
    const penulis = firebase.auth().currentUser.displayName


    if(!category) return <Loading />
    if(!articles) return <Loading />

    const dataUrl = articles.map(article => (
      { url : article.url }
    ))

    const testUrl = (value) => {
      return dataUrl.some(item => JSON.stringify(item.url) === JSON.stringify(value))
    }

    const handleCategory = (newValue) => {
      setKategori(newValue)
    }

    const createArticleSchema = yup.object({
      judul : yup.string()
          .required('Judul Tidak Boleh Kosong !'),
      url : yup.string()
          .required('URL Tidak Boleh Kosong !')
          .matches(/^[a-zA-Z0-9\-]*$/, 'URL Hanya Boleh Huruf,Angka dan - !')
          .test('is-input-incorrect', 'URL Sudah Ada', (value) => {
            return testUrl(value) !== true
          })
    })

    return (
      <>
      <NavbarDashboard />
      <div className='container'>
            <div className="row">
                <div className="col-12 mt-3">
                  <Formik 
                    initialValues={{
                      judul:'',
                      url: '',
                      konten: '',
                      status : false,
                      kategori : [],
                    }}
                    validationSchema={createArticleSchema}
                    onSubmit={ (values, actions) => {
                      values.konten = konten
                      
                      const dataBaru = kategori.map(data => {
                        const key = '__isNew__'
                        delete data[key]
                        return data
                      })

                      if(btnSimpan) {
                        setBtnPublish(false)
                        firestore.collection('Category').doc('categoryAll').set({
                          kategori : [...category[0].kategori, ...dataBaru]
                        })
                        firestore
                        .collection("Articles")
                        .add({ 
                            judul: values.judul,
                            url: values.url,
                            konten: values.konten,
                            kategori: dataBaru,
                            penulis: penulis,
                            status: values.status,
                            createdAt: firestore.FieldValue.serverTimestamp() 
                          }).then((res) => {
                            return history.push('/dashboard')
                          }).catch((err) => {
                            console.log(err)
                          })
                      }
                      if(btnPublish) {
                        setBtnSimpan(false)
                        values.status = true
                        
                        firestore.collection('Category').doc('categoryAll').set({
                          kategori : [...category[0].kategori, ...dataBaru]
                        })

                        firestore
                        .collection("Articles")
                        .add({ 
                            judul: values.judul,
                            url: values.url,
                            konten: values.konten,
                            kategori: dataBaru,
                            penulis: penulis,
                            status: values.status,
                            createdAt: firestore.FieldValue.serverTimestamp() 
                          }).then((res) => {
                            return history.push('/dashboard')
                          }).catch((err) => {
                            console.log(err)
                          })
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
                          data={konten}
                          onChange={(event, editor) => {
                              const data = editor.getData()
                              setKonten(data)
                          }}
                          onBlur={ ( event, editor ) => {
                              if(!_.isEmpty(editor.getData())) {
                                setErrorKonten(false)
                              } else {
                                setErrorKonten(true)
                              }
                          }}
                        />
                      <small className="form-text text-danger">{ errorKonten ? 'Tidak Boleh Kosong' : ' '}</small>
                      </div>
                      <div className="form-group">
                        <CreatableSelect
                            isMulti
                            onChange={handleCategory}
                            options={category[0].kategori}
                         
                        />
                        <small className="form-text text-danger">{ errorKategori ? 'Tidak Boleh Kosong' : ' '}</small>
                      </div>
                      <button type='submit' className='btn btn-primary w-100 my-3 simpan' onClick={() => setBtnSimpan(true)}>Simpan</button>
                      <button type='submit'  className='btn btn-success w-100 mb-4 publish' onClick={() => setBtnPublish(true)}>Publikasikan</button>
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

export default CreateArticle

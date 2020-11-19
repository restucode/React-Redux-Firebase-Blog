import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'
import CreatableSelect from 'react-select/creatable'

const CreateArticle = () => {
    const [ text, setText ] = useState('')
    const [ judul, setJudul ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ status, setStatus ] = useState(false)
    const [ kategori, setKategori ] = useState([
        {label: 'Ocean', value: 'Ocean'}
    ])


    const handleCategory = (newValue) => {
      setKategori(newValue)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if(e.target.classList.contains('simpan')) {
        if(url && url.match(/^[a-z-0-9\s]+$/)) {
            console.log('ok')
        }
      } else if(e.target.classList.contains('publish')) {
        setStatus(true)
      }
    }
    
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12 mt-3">
                <form>
                  <div className="form-group">
                        <input type="text" className="form-control" placeholder="Judul Artikel" 
                          onChange={(e) => setJudul(e.target.value)} 
                        />
                  </div>
                  <div className="form-group">
                        <input type="text" className="form-control" placeholder="URL Artikel" 
                          onChange={(e) => setUrl(e.target.value)} 
                        />
                  </div>
                 
                  <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}
                  />
                   <div className="form-group">
                    <CreatableSelect
                        isMulti
                        onChange={handleCategory}
                        options={kategori}
                    />
                  </div>
                  <button className='btn btn-primary w-100 my-3 simpan' onClick={handleSubmit}>Simpan</button>
                  <button className='btn btn-success w-100 mb-4 publish' onClick={handleSubmit}>Publikasikan</button>
                  </form>
                {parse(text)}
                </div>
                <div className="col-12">
                 
                </div>
            </div>
        </div>
    )
}

export default CreateArticle

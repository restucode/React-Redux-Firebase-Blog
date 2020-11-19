import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditArticle = () => {
    const [ text, setText ] = useState('')
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}
                />
                </div>
            </div>
        </div>
    )
}

export default EditArticle

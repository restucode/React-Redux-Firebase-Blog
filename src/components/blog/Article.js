import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const Article = () => {
    return (
        <>
        <Navbar />
        <hr/>
        <div className="row mt-3 ">
            <div className="col-md-8 offset-md-2">
                <h1 className='h2 pb-3'>3 Cara Menghapus File/Folder Tidak Bisa Dihapus (Laptop/PC)</h1>
                <div className='d-flex flex-column pb-3'>
                    <span><span className='text-black-50 pr-1'>Dipublikasikan Oleh</span>Restu Kersana</span>
                    <span>17 November 2020</span>
                    <div className='pt-1'>
                        <Link className='badge badge-dark mr-1' to=''>Anime</Link>
                        <Link className='badge badge-dark mr-1' to=''>Anime</Link>
                        <Link className='badge badge-dark mr-1' to=''>Anime</Link>
                    </div>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, cupiditate autem. Alias optio ad eos quam dolorem odit aperiam quos aspernatur non corrupti fugit beatae aut possimus totam vitae tempora exercitationem, recusandae in quasi ea veniam vel voluptatem voluptates. Repellendus dignissimos, vitae ipsum minus reiciendis ducimus, praesentium fugit officia pariatur dicta rerum expedita. Voluptates et impedit voluptatum nam accusamus excepturi, quas rerum laborum cupiditate necessitatibus quisquam repudiandae reiciendis modi dolorum architecto consectetur dolores, assumenda, odit provident explicabo ipsa alias consequatur facere! Officia minima, numquam eos architecto consequatur facilis rem fugit ipsa quas nihil neque pariatur natus eaque, ad inventore exercitationem.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, cupiditate autem. Alias optio ad eos quam dolorem odit aperiam quos aspernatur non corrupti fugit beatae aut possimus totam vitae tempora exercitationem, recusandae in quasi ea veniam vel voluptatem voluptates. Repellendus dignissimos, vitae ipsum minus reiciendis ducimus, praesentium fugit officia pariatur dicta rerum expedita. Voluptates et impedit voluptatum nam accusamus excepturi, quas rerum laborum cupiditate necessitatibus quisquam repudiandae reiciendis modi dolorum architecto consectetur dolores, assumenda, odit provident explicabo ipsa alias consequatur facere! Officia minima, numquam eos architecto consequatur facilis rem fugit ipsa quas nihil neque pariatur natus eaque, ad inventore exercitationem.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, cupiditate autem. Alias optio ad eos quam dolorem odit aperiam quos aspernatur non corrupti fugit beatae aut possimus totam vitae tempora exercitationem, recusandae in quasi ea veniam vel voluptatem voluptates. Repellendus dignissimos, vitae ipsum minus reiciendis ducimus, praesentium fugit officia pariatur dicta rerum expedita. Voluptates et impedit voluptatum nam accusamus excepturi, quas rerum laborum cupiditate necessitatibus quisquam repudiandae reiciendis modi dolorum architecto consectetur dolores, assumenda, odit provident explicabo ipsa alias consequatur facere! Officia minima, numquam eos architecto consequatur facilis rem fugit ipsa quas nihil neque pariatur natus eaque, ad inventore exercitationem.</p>
            </div>
        </div>
        </>
    )
}

export default Article

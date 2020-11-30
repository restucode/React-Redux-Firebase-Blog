import React from 'react'
import Shimmer from './Shimmer'
import './Skeleton.css'
import SkeletonElement from './SkeletonElement'

const SkeletonArticle = ({ theme }) => {

    const themeClass = theme || 'light'

    return (
        <>
         <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
           <div className={`skeleton-wrapper ${themeClass} shadow`} >
            <div className='skeleton-article'>
                <SkeletonElement type='image' />
                <SkeletonElement type='title' />
                <SkeletonElement type='text' />
                <SkeletonElement type='text' />
                <SkeletonElement type='text' />
                <SkeletonElement type='kategori' />
            </div>
            <Shimmer />
           </div>
         </div>
        
        </>
        
        
    )
}

export default SkeletonArticle

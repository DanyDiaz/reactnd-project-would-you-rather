import React from 'react'
import { FiCloudOff } from 'react-icons/fi'

function NotFound() {
    return (
        <div className='question flexbox-container full-question'>
            <h3>Page Not Found</h3>
            <FiCloudOff className='not-found-image' size={150} />
            <label className='big-label'>
                Please review the URL
            </label>
        </div>
    )
}

export default NotFound
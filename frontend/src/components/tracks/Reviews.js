import React from 'react'
import { isUser } from '../../lib/auths'

const Reviews = ({ reviews, deleteReview, track }) => {
  console.log(reviews.user._id)
  console.log(track.user)
  const edited = reviews.createdAt.split('T')
  const date = edited[0]
  const time = edited[1].split('.')[0]
  const textAdapted = reviews.text.charAt(0).toUpperCase() + reviews.text.slice(1)
  return (
    <section className="review-section">
      <div className="reviews-each">
        <div className="reviews-content">
          <h6 className="author-of-comment">Written by <span className="username-span">{reviews.user.username}</span></h6>
          <p className="main-review-words">{textAdapted}</p>
          <p className="date-on-comment">{time} {date}</p>
        </div>
        {isUser(reviews.user._id) && <div className="review-buttons-div">
          <button onClick={deleteReview} value={reviews._id}>Delete</button>
        </div>}
      </div>
    </section >
  )
}



export default Reviews
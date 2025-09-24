import React, { Component } from 'react'
import './stars.css'

function Stars({rating, countRate, maxRating = 5}){
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
       <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="star full">★</span>
      ))}
      
      {hasHalfStar && (
        <span className="star half">★</span>
      )}
      
      {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <span key={i + fullStars} className="star empty">★</span>
      ))}
      <span className='count_rate'>{countRate}</span>
    </div>
    )
  }


export default Stars
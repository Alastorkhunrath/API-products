import React from 'react'
import Stars from '../stars/Stars'


export default function ProductCard({productItem, onBuy}) {
    const handleClick = (e) => {
        onBuy(productItem.id)
    }
  return (
    <div className='product_card'>
        <div className='product_card_block_img'>
            <div className='block_img' style={{backgroundImage: `url(${productItem.image})`}}></div>
        </div>
        <div className='p_4'>
            <div>
                <h3 className='name_product'>{productItem.title}</h3>
            </div>
            <Stars rating={productItem.rating.rate} countRate={productItem.rating.count} />
            <p className='description'>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты.</p>
            <div className='desc_product_card'>
                  <span className='price_text_product'>
                    ${productItem.price}
                  </span>
                  <button className='add_to_cart' onClick={handleClick}>Buy</button>
            </div>
        </div>
    </div>
  )
}

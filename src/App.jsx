import { useState,useEffect, useRef } from 'react'
import { BsBasket3 } from "react-icons/bs";
import './App.css'
import { MdDeleteForever } from "react-icons/md";
import  ProductCard  from './components/productCard/ProductCard'
import { getProductData } from './services/productServices';

function App() {
  const [products, setProducts] = useState([])
  const [filterProducts, setfilterProducts] = useState(products)
  const [err, setErr] = useState(null)
  const [load, setLoad] = useState(true)
  const [basketActive, setBasketActive] = useState(false)
  const [totalProducts, setTotalProducts] = useState([])
  const [totalPrice,setTotalPrice] = useState(0)

  const [btnsPress, setBtnsPress] = useState([
    {
      textBtn: "Все",
      dataCategory:"all",
      active: true
    },
    {
      textBtn: "Электроника",
      dataCategory:"electronics",
      active: false
    },
    {
      textBtn: "Украшения",
      dataCategory:"jewelery",
      active: false
    },
    {
      textBtn: "Мужская одежда",
      dataCategory:"men's clothing",
      active: false
    },
    {
      textBtn: "Женская одежда",
      dataCategory:"women's clothing",
      active: false
    },

  ])


  useEffect(() => {
    const loadProducts = async () => {
      const productData = await getProductData()
      setProducts(productData)
    }
    loadProducts()
  },[])

  useEffect(() => {
    console.log(products)
    setfilterProducts(products)
  },[products])

const filterProduct = (category) => {
  if (category === 'all'){
    setfilterProducts(products)
  } else {
    const filteredProduct = products.filter(item => category === item.category)
    setfilterProducts(filteredProduct)
  }
  
}
  const filterbtn = (e) => {
    const nameBtnTarget = e.target.innerText
    const dataCategory = e.target.getAttribute('data-сategory')
    const newBtns = btnsPress.map(item => {
      if (item.dataCategory === dataCategory){
        console.log('Нажал')
        return {...item, active: true}
      } else {
        return {...item, active:false};
      }
    })
    filterProduct(dataCategory)
    setBtnsPress(newBtns)
}

const hundleClikBasket = (e) => {
  if (!basketActive){
    setBasketActive(true)
  } else{
    setBasketActive(false)
  }
}

const huncleBuyClick = (index) => {
const element = products.find(product => product.id === index)
  if (element) {
    const existingProductIndex = totalProducts.findIndex(item => item.id === element.id);
    if (existingProductIndex !== -1){
      const updatedProducts = [...totalProducts];
      updatedProducts[existingProductIndex].count += 1;
      setTotalProducts(updatedProducts);
    } else {
      const cardItem = {
        id: element.id,
        image: element.image,
        name: element.title,
        price: element.price,
        count: 1
      }
      setTotalProducts([...totalProducts, cardItem])
    }
  } 
}

const hundlePlusClick = (e,index) => {
  const updateTotalProduct = totalProducts.map(item => {
    if (item.id === index){
      return {...item, count: item.count + 1}
    } else {
      return item
    }
  })
console.log(updateTotalProduct)
setTotalProducts([...updateTotalProduct])
}

const hundleMinusClick = (e,index) => {
  let updateTotalProduct = totalProducts.map(item => {
    if (item.id === index){
        return {...item, count: item.count - 1}
    } else {
      return item
    }
  })
console.log(updateTotalProduct)
updateTotalProduct = updateTotalProduct.filter((item) => item.count > 0)

setTotalProducts([...updateTotalProduct])
}

const deleteProductTotal = (e,index) => {
  let updateTotalProduct = totalProducts.map(item => {
    if (item.id === index){
      return {...item, count: 0}
    } else {
      return item
    }
  })
  updateTotalProduct = updateTotalProduct.filter((item) => item.count > 0)
  setTotalProducts([...updateTotalProduct])
}



useEffect(() => {
  if (!basketActive){
    document.body.style.overflow = 'auto'
  } else{
    document.body.style.overflow = 'hidden'
  }
},[basketActive])

useEffect(() => {
  let currentPrice = 0
  for (let i = 0; i<totalProducts.length; i++){
    currentPrice += (totalProducts[i].price * totalProducts[i].count)
  }
  setTotalPrice(currentPrice)

  // console.log(totalProducts)
},[totalProducts])

// style={{filter: `${!basketActive? 'brightness(50%)': 'brightness(1)' }`}}
  return (
    <>
      <header>
        <nav className='nav container'>
          <div className='logo_left'>
            <h1>Shop</h1>
          </div>
          <div className='nav_container_svg'>
            <BsBasket3 className='basket_svg'  style={{height: '2em', width: '2em', cursor:'pointer'}} onClick={hundleClikBasket} />
              {totalProducts.length !== 0? <p className='length_total_product'>{totalProducts.length}</p> : null}
            
          </div>
        </nav>
      </header>
      <div className='cart-overlay' style={{display:  `${!basketActive? 'none': 'block' }`}}></div>
      <div className='right__busket' style={{right: `${basketActive? '0': '-100%'}`}}>
          <div className='right__busket__container'>
            <h3>Корзина</h3>
            <button className='close_basket' onClick={hundleClikBasket}>
              <span>+</span></button>
          </div>
         
          <div className='card_items'>
            {totalProducts.length === 0? <p className='ta-c pa'>Ваша корзина пуста</p>
            : totalProducts.map(totalItem => (
              <div className='total_card_item'>
                  <button className='delete_btn' onClick={(e) => deleteProductTotal(e,totalItem.id)}>
                  <MdDeleteForever className='basket_delete' />
                  </button>
                <div className='total_img'>
                  <img src={totalItem.image} style={{width: '4rem', height: '4rem'}} alt="" />
                </div>
                <div className='total_info'>
                  <h4>{totalItem.name}</h4>
                  <p>${totalItem.price} x {totalItem.count}</p>
                </div>
                <div className='total_btns_count'>
                  <button className='minus' onClick={(e) => hundleMinusClick(e,totalItem.id)}>-</button>
                    <span className='product_count'>{totalItem.count}</span>
                  <button className='plus' onClick={(e) => hundlePlusClick(e,totalItem.id)}>+</button>
                </div>
              </div>
            ))
            }
            
          </div>
          <div className='total_block'>
            <div className='total'>
              <span className='total_text'>Итого:</span>
              <span className='total_price'>${Math.round(totalPrice)}</span>

            </div>
            <button className='btn_total'>Оформить заказ</button>
          </div>
        </div>
        
      <main className='container'  style={{overflow: `${!basketActive? 'auto':'hidden'}`}}>
        <div className='mb-8'>
          <h2 className='text_mb-8'>Наши товары</h2>
          <div className='btn_cotegory'>          
            {btnsPress.map(item => (
              <button className={item.active? 'bg_blue_btn': 'bg_gray_btn'} 
              data-сategory={item.dataCategory} onClick={filterbtn}>
                  {item.textBtn}
              </button>
            ))}  

            {/* <button className='bg_blue_btn' dataСategory="all" onClick={filterbtn}>Все товары</button>
            <button className='bg_gray_btn' dataСategory="electronics" onClick={filterbtn}>Электроника</button>
            <button className='bg_gray_btn' dataСategory="jewelery" onClick={filterbtn}>Украшения</button>
            <button className='bg_gray_btn' dataСategory="men's clothing" onClick={filterbtn}>Мужская одежда</button>
            <button className='bg_gray_btn' dataСategory="women's clothing" onClick={filterbtn}>Женская одежда</button> */}
         
          </div>
        </div>
        <div className='product_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filterProducts.map(item => (
            <ProductCard productItem={item} onBuy={huncleBuyClick} />))}
        </div>
        <div id='loader' style={{display: load? 'block': 'none'}}>
          <div className='loading_spinner'></div>
        </div>
        </main>
    </>
  )
}

export default App

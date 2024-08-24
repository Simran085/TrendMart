import React, {useEffect, useState } from 'react'
import './ListProduct.css'
// import cross_icon from '../../Admin_Assets/cross_icon.png'
//console.log(cross_icon);

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);
  // // const [error, setError] = useState(null); // Add error state

  const fetchInfo = async ()=> {
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=> {setAllProducts(data)});
  }

  useEffect(() => {
    fetchInfo();
  },[])

  const remove_product = async (id)=> {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application-json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index)=> {
          return <> <div key={index} className='listproduct-format-main listproduct-format'>
               <img src={product.image} alt=""  className='listproduct-product-icon'/>
               <p>{product.name}</p>
               <p>₹{product.old_price}</p>
               <p>₹{product.new_price}</p>
               <p>{product.category}</p>
               <svg onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="currentColor">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89a.996.996 0 0 0 0-1.41z"/>
                </svg>

            </div>
            <hr /></>
        })}
      </div>

    </div>
  )
}

export default ListProduct

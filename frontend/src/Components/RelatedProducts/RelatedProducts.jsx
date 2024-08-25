import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import './RelatedProducts.css';

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);

  // Assuming 'all_product' contains all related products and is already filtered to match the current product category.
  // Slice the array to get only the first 4 products.
  const relatedProducts = all_product.slice(0, 4);

  return (
    <div className='related-products'>
      <h2>Related Products</h2>
      <div className='related-products-list'>
        {relatedProducts.map((product, index) => (
          <Item
            key={index}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;


// import React, { useEffect, useState } from 'react';
// import './RelatedProducts.css';
// import Item from '../Item/Item';

// const RelatedProducts = () => {
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:4000/allproducts')  // or an appropriate endpoint
//       .then((response) => response.json())
//       .then((data) => setRelatedProducts(data));
//   }, []);

//   return (
//     <div className='relatedproducts'>
//       <h1>Related Products</h1>
//       <hr />
//       <div className="relatedproducts-item">
//         {relatedProducts.map((item, i) => (
//           <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedProducts;


// // import React from 'react'
// // import './RelatedProducts.css'
// // import data_product from '../Assets/data'
// // import Item from '../Item/Item'

// // const RelatedProducts = () => {
// //   return (
// //     <div className='relatedproducts'>
// //       <h1>Related Products</h1>
// //       <hr />
// //       <div className="relatedproducts-item">
// //         {data_product.map((item,i) => {
// //             return <Item key={i} id={item.id} name={item.name} image={item.image} new_price = {item.new_price} old_price={item.old_price} />
// //         })}
// //       </div>
// //     </div>
// //   )
// // }

// // export default RelatedProducts

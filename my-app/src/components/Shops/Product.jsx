import React from 'react'
import "./style.css"

const Product = ({ products, addToCart }) => {
    return (
        <div className='box'>
            {products && products.map((product) => {
                return (
                    <div key={product.id} className='product mtop'>
                        <div className='img'>
                            <img className='img' src={"./images/products/" + product.img + ".png"} alt='' />
                        </div>
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <div className="price">
                                <h4>{product.price} €</h4>
                                <button onClick={() => addToCart(product)}>
                                    <i className='fa fa-plus'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Product;
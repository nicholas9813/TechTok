import Product from './Product';
import "./style.css"



const ListProduct = ({ id, name, icon, products, addToCart }) => {


    return (
        <section key={id} className='flash'>
            <div className='container-custom'>
                <div className='heading f_flex'>
                    <i className={icon}></i>
                    <h1>{name}</h1>
                </div>
                <Product products={products} addToCart={addToCart} />
            </div>
        </section>
    )
}

export default ListProduct;
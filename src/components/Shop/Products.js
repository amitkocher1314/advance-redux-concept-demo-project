import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dummy_products = [
    { id:'p1' , price:6 , title: 'my first book' ,description:'This is a first product - amazing!'},
    { id:'p2' , price:63, title: 'my second book' ,description:'This is a first product - amazing!'}
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((product)=>(
               <ProductItem
               key = {product.id}
               id = {product.id}
               title={product.title}
               price={product.price}
               description={product.description}
             />
        ))}
       
      </ul>
    </section>
  );
};

export default Products;

import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { uiActions } from './components/store/ui-slice';
import Notification from './components/UI/Notification';


let initialState  = true;

function App() {
 const showCart =  useSelector(state => state.ui.cartIsVisible);
 const cart = useSelector(state => state.cart);
 const dispatch = useDispatch();
const notification = useSelector(state => state.ui.notification)


   useEffect(()=>{

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending...',
        message:'Sending Cart Data!'
      }))
    const respose = await  fetch('https://redux-plus-side-effect-default-rtdb.firebaseio.com/cart.json' ,{
        method :'PUT',
        body :JSON.stringify(cart),
      });
      if(!respose.ok){
        throw new Error('Sendind cart data failed');
        
     
      }

      dispatch(uiActions.showNotification({
        status:'Success',
        title:'Success!',
        message:'Sent Cart Data success!'
      }))
     }
   
    if(initialState){ 
      initialState = false                 //it handle initial condition that notification not display when first time form loads
      return
    }


     sendCartData().catch(()=>{
      dispatch(uiActions.showNotification({
        status:'Error',
        title:'Failed!',
        message:'Cart Data send Failed!'
      }))
     })
    },[cart ,dispatch]);


  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
     {showCart && <Cart />
}      <Products />
    </Layout>
    </>
  );
}

export default App;

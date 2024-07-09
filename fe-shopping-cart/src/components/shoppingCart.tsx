import { Button, Offcanvas, Stack } from "react-bootstrap";
import { saveStoreItems, toggleOpenCart } from "../features/StoreHome/storeSlice";

import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { API_PREFIX, axiosApi } from "../api/base";


export function ShoppingCart() {
    const { storeItems, isOpen, cartItems } = useAppSelector((state) => state.cartStore)
    const dispatch = useAppDispatch()
    
    const handleSubmit = () => {
        const mappedCartItems = cartItems.map(cartItem => {
            const storeItem = storeItems.find(item => item.id === cartItem.id);
            return {
              ...storeItem,
              quantity: cartItem.quantity,
              total: storeItem?.price || 0 * cartItem.quantity,
              item: storeItem?.id
            };
          });
          console.log('mappedCartItems',mappedCartItems)
          const total = mappedCartItems.reduce((sum, item) => sum + item.total, 0);
        const payload = {
            items: mappedCartItems,
            total
        }
        console.log('payload',JSON.stringify(payload))
        // dispatch(saveStoreItems(payload))

        axiosApi.post(API_PREFIX + '/invoices', payload).then((response) => {
            console.log('response',response)
            dispatch(toggleOpenCart())
        }).catch((error) => {
            console.log('error',error)
        })

        // dispatch(toggleOpenCart())
    }
    
    return <Offcanvas show={isOpen} placement='end' onHide={() => dispatch(toggleOpenCart())}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item}/>
                ))}
            </Stack>
            <div className="ms-auto fw-bold">
                Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                    const item =  storeItems.find(i => i.id === cartItem.id)
                    return total + (item?.price || 0)  * cartItem.quantity
                }, 0)
                )}
            </div>

            {cartItems.length > 0 ? <Button type="button" className='w-100 outline-danger mt-5' variant="danger" onClick={handleSubmit} >Submit</Button> : null}
            
        </Offcanvas.Body>
    </Offcanvas>
}
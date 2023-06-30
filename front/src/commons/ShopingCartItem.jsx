import React, { useState } from "react";



function ShopingCartItem({addedProduct,removeItem}){

    const { id, name, price, url_image} = addedProduct;

    const[count,setCount]=useState(1)

    const handleAddCount=()=>{
        setCount(count+1)
    }
    const handleSubstract=()=>{
        if(count>1) setCount(count-1)
       
    }

    return(
        
      <div className="cartItem-content">
        <div className="cartItem-img-content">
            <img src={url_image} />
            
        </div>

        <h3>{name}</h3>
        
        <div className="content-btn-add-substract">

        <button className="btn-add-substract" onClick={handleSubstract}> - </button>
        <h3>{count}</h3>
        <button className="btn-add-substract" onClick={handleAddCount}> + </button>

        </div>
        
        <h3>${price *count}</h3>
        <h3 className="carItem-btn-eliminar" onClick={()=>removeItem(id)}>Eliminar</h3>

      </div>
     
    )
}

export default ShopingCartItem;


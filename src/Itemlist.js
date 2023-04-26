import React from "react";
import { FaEdit,FaRegTrashAlt } from "react-icons/fa";



const Itemlist=({ items,itemEditItem,itemRemovedItem })=>{

    return (
 
        items.map((item)=>{
            return(
                <article className="grocery-item" key={item.id}>
                <p className="title">{item.name}</p>
                <div className="btn-container">
                    <button type="button" className="edit-btn" onClick={()=>{ itemEditItem(item.id) }}>
                        <FaEdit />
                    </button>
                    <button type="button" className="delete-btn" onClick={()=>{ itemRemovedItem(item.id) }}>
                        <FaRegTrashAlt />
                    </button>
                </div>
                </article> 
            )
        })
  
  )

    }

export default Itemlist;
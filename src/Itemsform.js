import React,{useState,useEffect} from "react";
import Itemlist from "./Itemlist";
import Removebt from "./Removebt";

const getLocalstorageitems=()=>{
    let list = localStorage.getItem('list_add_items');
    if (list) {
      return (list = JSON.parse(localStorage.getItem('list_add_items')));
    } else {
      return [];
    }
}

const Itemsform=()=>{
    const [forminput,setForminput]=useState('');
    const [list,setList]=useState(getLocalstorageitems());
    const [itemEdit,setItemEdit]=useState(false);
    const [itemEditID,setItemEditID]=useState(null);
    const [alert,setAlert]=useState({ show: false, msg: '', type: '' });
  

    const handlesubmit=(e)=>{
       e.preventDefault();
       if(!forminput){
        console.log("blnakc")
        setAlert({ show: true, msg: 'please enter value', type: 'alert-danger' });
       }
       else if(forminput && itemEdit){
        console.log("edit enable"+itemEditID)
        console.log("edit enable"+itemEditID)
        setList(
            list.map((item)=>{
                if(item.id === itemEditID){
                    return {...item,name:forminput}
                }
                return item;
            })
        
        )
        setForminput('');
        setItemEditID(null);
        setItemEdit(false);
        setAlert({ show: true, msg: 'item have been edited', type: 'alert-success' });
        

       }else{
        const newItems={id:new Date().getTime().toString(),name:forminput};
        setList([...list,newItems]);
        setForminput('');
        setAlert({ show: true, msg: 'item have been added', type: 'alert-success' });
       }
       
    }
    const removedlist=()=>{
       setList([]);
    }
    const itemEditItem=(id)=>{
           console.log("edit click"+ id)
           const edititemd = list.find((item)=>item.id === id)
           setForminput(edititemd.name)
           setItemEdit(true)
           setItemEditID(id)
          
     }
     const itemRemovedItem =(id)=>{
        const newreitem =list.filter((list)=>list.id !== id)
        setList(newreitem)
        setAlert({ show: true, msg: 'item have been removed', type: 'alert-danger' });
    }

    useEffect(()=>{
    setTimeout(()=>{
        setAlert({ show: false, msg: '', type: '' });
    },2500)
    localStorage.setItem('list_add_items', JSON.stringify(list));
    },[list])

    return(
        <section className="section-center">
        {alert && <p className={`alert ${alert.type} `}>{alert.msg}</p> }
        <form className="grocery-form">
           <h3>grocery bud</h3>
           <div className="form-control">
            <input type="text" className="grocery" placeholder="e.g. eggs" value={forminput} 
            onChange={(e)=>{setForminput(e.target.value)}} />
            <button type="submit" className="submit-btn" onClick={handlesubmit}>{itemEdit?"Edit":"submit"}</button>
            </div>
        </form>
        {
        list.length > 0 && (
               <div className="grocery-list">
               <Itemlist  items={list} itemEditItem={itemEditItem} itemRemovedItem={itemRemovedItem}/>
               <Removebt removedlist={removedlist} />
           </div>
       
        )
        }
     
     </section>
    )
}

export default Itemsform;
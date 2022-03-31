import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {GetProductList}  from './actions/Productactions'
import {useHistory,useLocation}  from 'react-router-dom'
import {Edit}  from './Edit'
import {SelectAll2}  from './SelectAll2'
import {Pagination}  from './Pagination'

import QueryString  from 'query-string'
export const List = () => {
    const loc=useLocation()
    const history=useHistory()
    console.log(loc.search)
    const parsed=QueryString.parse(loc.search)
    console.log(parsed.limit)
    console.log(parsed.offset)
    const [limit,setLimit]=useState(parsed.limit)
    const [newAdded,setNewAdded]= useState([])
    const [form,setForm]=useState({
      id:0,
      name:"",
      price:0
    })
    const [editForm,setEditForm]=useState({
      id:0,
      name:"",
      price:0
    })
    const [pid,setPid]=useState(0);
  const [showPerPage,setShowPerPage]= useState(limit)
  const [startPage,setStartPage]= useState(0)
  const [searchId,setSearchId] = useState(0)
  const [name,setName] = useState("enetr Nmae plz")
  const [pagination,setPagination]=useState({
    start:parsed.offset,
    end:showPerPage
  })
  const list=useSelector((state)=> state.List)
  const dispatch= useDispatch()
  console.log(list)
  
  const onPageChange=(start,end)=>{
   
    console.log(start,end)
    setPagination({start:start,end:end})
    history.push({
        pathname: '/list',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset: start}).toString()
        })
  }
  const [currentItems,setCurrentItems]=useState([])
  //const [currentItems,setCurrentItems]= useState([...list.data.slice(pagination.start,pagination.end)])
  //console.log(currentItems)
   
   console.log(currentItems)
    useEffect(()=>{
        dispatch(GetProductList());
        },[])
        const handleLimit=(e)=>{
            e.preventDefault()
              setLimit(e.target.value)
              setShowPerPage(e.target.value)
              onPageChange(0,e.target.value)
          
             // changeUrl();
              // history.push({
              //     pathname: '/Home',
              //     search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
              //     })
            
             
             
            }
            useEffect(()=>{
              setCurrentItems([...list.data.slice(pagination.start,pagination.end)])
            },[pagination.start,pagination.end])
            console.log(currentItems)
            useEffect(()=>{
                changeUrl();
              },[limit])
            const changeUrl=()=>{
                history.push({
                    pathname: '/list',
                    search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
                    })
            }
            const handleSubmit=(e)=>{
              e.preventDefault();
              const newItem={
                id:form.id,
                name:form.name,
                price:form.price
              }
              const newData=[...currentItems]
              const new1=[]
              new1.push(newItem)
              setNewAdded(new1)
              console.log("new added is",newAdded)
              console.log(newData)
              newData.push(newItem)
              setCurrentItems(newData)
              
              //setForm(newData)

            }
            const handleEdit=(id,item)=>{
              console.log(id)
              setPid(id)
              const editData={
                id:item.id,
                 name:item.name,
                price:item.price,
                
         
         
             }
             setEditForm(editData)

            }
            const EditHandle=(event)=>{
              
                event.preventDefault()
                
                setEditForm({...editForm,[event.target.name]: event.target.value})
              
              
              }
              
              const  handleEditFormSubmit=async(e)=>{
                e.preventDefault();
                console.log(editForm)
                
                  // await axios.put(`https://fakestoreapi.com/products/${productId}`, editform)
                  //   .then(res => {
                  //     console.log(res.data)
                    const newproducts = [...currentItems]
                    // console.log(contactId)
                
                    const index = newproducts.findIndex((product) => product.id === pid)
                    console.log(index)
                    //newproducts[index] = res.data;
                    newproducts[index]= editForm
                 
                    setCurrentItems(newproducts)
                    setPid(null)
                 
            }
            const handleCancel=()=>{
              setPid(0)
            }
         const   handleDelete=(index)=>{
           const newData=[...currentItems]
           newData.splice(index,1)
           setCurrentItems(newData)

            }
            const handleChangeChk = (e) => {
              const { name, checked } = e.target;
            console.log(name)
            console.log(checked)
            if (name === "Allselect") {
              let tempUser = currentItems.map(item => {
                return { ...item, isChecked: checked }
              })
              setCurrentItems(tempUser)
            } else {
              let tempUser = currentItems.map(item => item.id    === parseInt(name)? { ...item, isChecked: checked } : item)
        console.log(tempUser)
              setCurrentItems(tempUser)
        
        
        
        
            }
        
          }
          const deleteSelected=(e)=>{
            e.preventDefault()
            let newList=[...currentItems]
            const a = currentItems.filter((item) => item?.isChecked === true)
            console.log("checked array", a)
            for(let i =0;i<a.length;i++){
           
            const ind= newList.findIndex(el=>el.id===a[i].id)
            newList.splice(ind,1)

            }
            setCurrentItems(newList)
          }
          const handleSearchId=(e,searchId)=>{ //succeessful for original data from actions
           // e.preventDefault()
            var newData=[]
            var list1=[...currentItems]
//for(let i=0;i<currentItems.length;i++){
        const a=list1.filter(p=>p.id=== parseInt( searchId))
        console.log(a)
           newData=a; 
           setCurrentItems(newData)
       
         
        }
        const handleSearchId1=(e,searchId)=>{ //succeessful for original data from actions
       
       }
           
           // setCurrentItems(newData)
         // }
           // }
    return (
        <div >
          <table>
            <tr>
              <td><label>Search by ID</label></td>
              <td><input type="number" value={searchId} 
              onChange={(e)=>
              setSearchId(e.target.value)}
              /></td>
              <button onClick={(e)=>handleSearchId(e,searchId)}>Search</button>
            </tr>
          </table>
           <span>
                  
                  <button 
                  className="btn btn-lg btn-danger"
                  onClick={(e)=>deleteSelected(e)}>Delete Selected
                  <i class="fa fa-trash" aria-hidden="true"></i></button>
                  </span>  
          <form  onSubmit={handleEditFormSubmit} >
            <table style={{width:"100%",marginLeft:"20px;"}} border="5px"  >
                <tr  style={{backgroundColor:"grey"}}>
                <th style={{paddingLeft:"20px"}}>
                   <SelectAll2 list={currentItems}   handleChange={handleChangeChk} 
                   
                   />
                   </th>
                    <th>ID</th>
                    <th>Nmae</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
          
            {
              
        
              
              currentItems.map((item,index)=>{
                return(<>
                {
                pid===item.id ? 
                (<Edit editForm={editForm} 
                  handleCancel={handleCancel}
                  EditHandle={EditHandle}/>):
             
                 (<>
                 <tr style={{border:"5px solid lightgrey"}} >
                 <td style={{paddingLeft:"20px"}}>
                <input type="checkbox" 
              className="  custom-control-input"
                name={item.id}
                    checked={item?.isChecked || false}
                    onChange={handleChangeChk} 
                    />
                </td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.price}</td>
                     <td>

                       <button onClick={()=>handleEdit(item.id,item)}>Edit</button>
                     </td>
                     <td>

                       <button onClick={()=>handleDelete(index)}>Delete</button>
                     </td>

                 </tr>
                 
                 </>)
              }
                 </>
                )
             })
            }
            </table>
            </form>
             <ul style={{display:"flex", listStyleType:"none",marginLeft:"500px"}}>
          <li>
      <select style={{height:"40px",width:"100px"}}
               value={limit}
                name="limit"
              //  placeholder={placeholder}
                onChange={handleLimit}
                
              >
               
                <option value="10">10</option>
                <option value="20">
                  20
                  </option>
                <option value="5">5</option>
                <option value="25">25</option>
              </select>
              </li>
              <li>
             <Pagination showPerPage={showPerPage} onPageChange={onPageChange}
      total={list.data.length} limit={limit}
      />
      </li>
      </ul>
<h2>Add new product</h2>
<hr/>
<form onSubmit={handleSubmit}>
      <table style={{marginLeft:"500px",marginTop:"100px"}}>
        <tr><td>ID</td>
        <td><input type="number" value={form.id} 
        onChange={(e)=>
          setForm({...form,id:e.target.value})
        }
        /></td></tr>
        <tr><td>Name</td>
        <td><input type="text" value={form.name}
         onChange={(e)=>
          setForm({...form,name:e.target.value})
        }
        /></td></tr>
        <tr><td>Price</td>
        <td><input type="number" value={form.price}
         onChange={(e)=>
          setForm({...form,price:e.target.value})
        }
        

        /></td></tr>
      </table>
      <br/>
      <input type="submit" value="submit"/>
      </form>
        </div>
    )
}

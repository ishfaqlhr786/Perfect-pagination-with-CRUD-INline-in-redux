import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {GetProductList}  from './actions/Productactions'
import {useHistory,useLocation}  from 'react-router-dom'
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
  const [showPerPage,setShowPerPage]= useState(limit)
  const [startPage,setStartPage]= useState(0)
  const [pagination,setPagination]=useState({
    start:parsed.offset,
    end:showPerPage
  })
  const onPageChange=(start,end)=>{
   
    console.log(start,end)
    setPagination({start:start,end:end})
    history.push({
        pathname: '/list',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset: start}).toString()
        })
  }
    const list=useSelector((state)=> state.List)
    const dispatch= useDispatch()
    console.log(list)
    
   
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
                changeUrl();
              },[limit])
            const changeUrl=()=>{
                history.push({
                    pathname: '/list',
                    search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
                    })
            }
    return (
        <div style={{textAlign:"center"}}>
            <table style={{marginLeft:"300px"}} >
                <tr>
                    <th>ID</th>
                    <th>Nmae</th>
                    <th>Price</th>
                </tr>
            </table>
            {
             list.data.slice(pagination.start,pagination.end).map(item=>{
                 return (<>
                 <tr key={item.id} style={{marginLeft:"300px"}}>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.price}</td>

                 </tr>
                 </>)
             })
            }
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
        </div>
    )
}

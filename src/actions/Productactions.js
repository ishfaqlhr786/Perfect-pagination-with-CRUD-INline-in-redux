
import axios from 'axios'
import React from 'react'
const data=[
    {id:1,name:"chair",price:2000},
    {id:2,name:"table",price:2000},
    {id:3,name:"knif",price:2000},
    {id:4,name:"cubaid",price:2000},
    {id:5,name:"bed" ,price:2000},
    {id:6,name:"chair",price:2000},
    {id:7,name:"table",price:2000},
    {id:8,name:"knif",price:2000},
    {id:9,name:"cubaid",price:2000},
    {id:10,name:"bed" ,price:2000},
    {id:11,name:"chair",price:2000},
    {id:12,name:"table",price:2000},
    {id:13,name:"knif",price:2000},
    {id:14,name:"cubaid",price:2000},
    {id:15,name:"bed" ,price:2000},
    {id:16,name:"chair",price:2000},
    {id:17,name:"table",price:2000},
    {id:18,name:"knif",price:2000},
    {id:19,name:"cubaid",price:2000},
    {id:20,name:"bed" ,price:2000},
]
export const GetProductList = () => async (dispatch) => {
  const id=2

   try {
      dispatch({
        type: "LIST_LOADING",
      });
  
    
     dispatch({
        type: "LIST_SUCCESS",
        payload: data,
       // count:res.count
     
      });
      
      
    } catch (e) {
      console.log(e.message, "error");
      dispatch({
        type: "LIST_FAIL",
      });
    }

  };
 // const product='Mens Cotton Jacket'
  
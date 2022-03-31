import React from 'react'

export const Edit = ({editForm,EditHandle,handleCancel}) => {
    console.log(EditHandle)
    return (
        <>
           <tr>
              
           <td>
           <input type="number" value={editForm.id}
           name="id"/>
           </td>
           <td>
           
           <input type="text" value={editForm.name}
           name="name" onChange={EditHandle}
           />
           </td>
           <td>
           
           <input type="number" value={editForm.price}
           name="price" onChange={EditHandle}
           />
           </td>
           <td>
               <button type="submit">save</button>
           </td>
           <td>
               <button onClick={handleCancel}>Cancel</button>
           </td>
           </tr>

        </>
    )
}

const initialState = {
    loading: false,
   data: [{}],
     errorMsg: "",
    count: 0,
 }
   const ListReducer = (state = initialState, action) => {
     switch (action.type) {
       case "LIST_LOADING":
         return {
           ...state,
           loading: true,
           errorMsg: "",
         };
   
       case "LIST_FAIL":
         return {
           ...state,
           loading: false,
           errorMsg: "Unable to catch Products",
         };
   
       case "LIST_SUCCESS":
         return {
           ...state,
          loading: false,
          data: action.payload,
 //errorMsg: "",
// count: action.payload.count,
        //  count: parseInt(action.payload.count),
         };
       default:
         return state;
     }
   };
   
   export default ListReducer;
   
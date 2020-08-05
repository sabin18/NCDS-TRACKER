 const response = (res,code,message,data)=> {
     if (!message || message== undefined){
     res.status(code).json({
       data: data,
     });
    }
    else{
     return(
        res.status(code).json({
            message,
            data: data, 
     })
     );
    }
  }

 const ErrorResponse = (res,code,message)=> {
  return(
     res.status(code).json({
        Error:message,
         
  })
  );
}

 export default {response, ErrorResponse};
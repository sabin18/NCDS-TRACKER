const productData={

    validData:{
      name: 'Cake',
      price: 100,
      isQuantitify:true,
      quantity:10,
      expiryDate:'2020-09-12'
    }, 

    WithMissingField:{
      name: 'Cake',
      isQuantitify:true,
      quantity:3,
      expiryDate:'2020-09-12'
      }, 
  
    existingProduct:{
      name: 'Cake',
      price: 100,
      isQuantitify:true,
      quantity:3,
      expiryDate:'2020-09-12'
      }, 
  }
  
  export default productData;
const userData={

  adminData:{
    id :'b936e941-0647-4a2d-ab61-ec470e86227c',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@gmail.com',
    password:'$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
    role:1,
    isActive:true,
    isVerified: true,
    image:'',
    createdAt: '2020-06-03T11:29:03.411Z',
    updatedAt: '2020-06-03T11:29:03.411Z'
  }, 

  adminData2:{
    id :'6d4a21d6-f16b-4c26-9db0-acd29bdd4d23',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user15@gmail.com',
    password:'$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
    role:1,
    isActive:true,
    isVerified:false,
    image:'',
    ID:'1234567897356794',
    createdAt: '2020-06-03T11:29:03.411Z',
    updatedAt: '2020-06-03T11:29:03.411Z'
  }, 

  validUser:{
    firstName: 'John',
    lastName: 'Doe',
    email: 'user1@gmail.com',
    password:'Umy@45',
    role:2,
    phoneNumber:'1234567897',
    ID:'1234567897456794',
  },
  
  validUser2:{
    firstName: 'John',
    lastName: 'Doe',
    email: 'user12@gmail.com',
    password:'Umy@45',
    role:2,
    phoneNumber:'1234567897',
    ID:'1234567897456799',
  },
  
  User1:{
    lastName: 'Doe',
    email: 'user1@gmail.com',
    password:'Umy@45',
    role:2,
    phoneNumber:'1234567897',
    ID:'1234567897456794',
  }, 
 userData1:{
        id:'6d4a21d6-f16b-4c26-9db0-acd29bdd4d20',
        firstName: 'John',
        lastName: 'Doe',
        email: 'user10@gmail.com',
        password:'Umy@45',
        role:2,
        phoneNumber:'1234567897',
        ID:'1234567897456797',
    },

  login:{
    email:'admin@gmail.com',
    password:'Pa55w0rd'
  },
  invaliLogin:{
    email: 'user1@gmail.com',
    password:'Umy@45',
  },

  missingField:{
    password:'Pa$5w0rd'
   
  },

  resetLinkData:{
    email: 'user15@gmail.com',
   
  },

  invalidEmail:{
    email: 'user11@gmail.com',
  },
  passwordData2: {
    newPassword: 'Pa$6W0rd',
    confirmPassword: 'Pa$6W0rd',
  },
  Missingpassword: {
    newPassword: '',
    confirmPassword: 'Pa$6W0rd',
  },
  Invalidpassword: {
    newPassword: 'Pa$6W0re',
    confirmPassword: 'Pa$6W0rd',
  },

}

export default userData;
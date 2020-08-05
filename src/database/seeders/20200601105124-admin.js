'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id :'b936e941-0647-4a2d-ab61-ec470e86227c',
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@gmail.com',
      password:'$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      role:1,
      isVerified: true,
      phoneNumber:7863123,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
    id:'6d4a21d6-f16b-4c26-9db0-acd29bdd4d20',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user10@gmail.com',
    password:'$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
    role:2,
    isVerified: true,
    phoneNumber:7863123,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id:'6d4a21d6-f16b-4c26-9db0-acd29bdd4d23',
    firstName: 'John',
    lastName: 'Doe',
    email: 'user15@gmail.com',
    password:'$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
    role:2,
    isVerified: false,
    phoneNumber:7863123,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

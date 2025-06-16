import { faker } from '@faker-js/faker';

export const generateEmployees = (count) => {
  return Array.from({ length: count }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 21, max: 60 }),
    email: faker.internet.email(),
    salary: faker.number.int({ min: 40000, max: 100000 }),
    department: faker.commerce.department(),
  }));
};

export const updateEmployee = (employee, newData) => {
  return { ...employee, ...newData };
};

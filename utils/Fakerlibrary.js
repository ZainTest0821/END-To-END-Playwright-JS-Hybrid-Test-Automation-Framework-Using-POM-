import { faker } from '@faker-js/faker';
import { JOB_CATEGORIES } from '../pages/PostyourjobPage.js';

export function generatePostJobData() {

   const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

return {
  firstName,
  lastName,
  company: faker.company.name(),
  email: faker.internet.email(),

  linkedin: `https://linkedin.com/in/${firstName}${lastName}`.toLowerCase(),

  phone: faker.string.numeric(10),
  jobType: faker.helpers.arrayElement(['Job', 'Project']),
  title: faker.lorem.words(3),
  description: faker.lorem.sentences(2),
 categories: faker.helpers.arrayElements(JOB_CATEGORIES, 3), // 3 random categories
  tags: 'qa,automation,test',
  budget: faker.number.int({ min: 50, max: 1000 }).toString()
}
};
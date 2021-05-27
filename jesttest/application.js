const request = require('supertest');
const server = require('../api/routes/index');
const models = require('../database/models')

describe("test for student endpoint", () => {
    afterAll(() => {
      return models.Application.destroy({
        truncate: true
      }); 
    });
  
  describe('POST /application/submit-application', () => {
    it('should Validate for request body', () => {
      return request(server)
        .post('/application/submit-application')
        .send({
          firstName: 'hi',
          lastName: 'hi',
          email: 'k@gmail.com',
          userName: 'hi',
          program: 'marketing'
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body.errors.first_name).toEqual(['The semester field is required.']);
        });
    });
  });

  });
jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const app = require('../index'); // Adjust this path to the actual location of your server.js file

const mockData = [{
    name: {
      common: "Indonesia",
      official: "Republic of Indonesia"
    },
    capital: ["Jakarta"]
  }];

describe('GET /', () => {
  it('should return a message indicating the server is running', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toContain('Countries Catalog Backend is running');
  });
});

describe('GET /country/:name', () => {
    it('should fetch data for Indonesia with name and capital', async () => {
      // Define the mock response
      const mockData = [{
        name: {
          common: "Indonesia",
          official: "Republic of Indonesia"
        },
        capital: ["Jakarta"]
      }];
  
      axios.get.mockResolvedValue({ data: mockData });
  
      const res = await request(app).get('/country/indonesia');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockData);
    });
  
  });
  
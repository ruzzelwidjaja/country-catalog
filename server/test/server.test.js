const axios = require('axios');
const request = require('supertest');
const app = require('../index');

// Mock axios for testing
jest.mock('axios');

// Mock data to simulate API response
const mockData = [{
  name: {
    common: "Indonesia",
    official: "Republic of Indonesia"
  },
  capital: ["Jakarta"]
}];

describe('Server Endpoints', () => {

  describe('GET /', () => {
    it('returns a message indicating the server is running', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toEqual(200);
      expect(response.text).toContain('Countries Catalog Backend is running');
    });
  });

  describe('GET /country/:name', () => {
    it('fetches and returns data for a specific country', async () => {
      axios.get.mockResolvedValue({ data: mockData });
      const response = await request(app).get('/country/indonesia');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(mockData);
    });

    // Additional test for error handling (if applicable)
    it('handles errors when fetching country data', async () => {
      axios.get.mockRejectedValue(new Error('API error'));
      const response = await request(app).get('/country/indonesia');
      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual({ message: "Error fetching country data" });
    });
  });

});

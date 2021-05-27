/* eslint-disable no-undef */
const FastBooking = require('../database/models');

afterAll(() => {
  FastBooking.close();
});

async function checkDB() {
  try {
    await FastBooking.authenticate();
    return 'Success';
  } catch (error) {
    return 'Failed';
  }
}
describe('Database Connection', () => {
  it('It connects successfully', async done => {
    try {
      const status = await checkDB();
      if (status === 'Failed') {
        done('Failed to connect');
      }
      expect(status).toBe('Success');
    } catch (error) {
      done('Failed to connect');
    }
    done();
  });
});
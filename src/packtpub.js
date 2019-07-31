const request = require('request');
const dayjs = require('dayjs');

const dateFormat = 'YYYY-MM-DDT00:00:00.000[Z]';

function loadOffers(date, callback) {
  const startDate = dayjs(date).format(dateFormat);
  const endDate = dayjs(date).add(1, 'day').format(dateFormat);
  const url = `https://services.packtpub.com/free-learning-v1/offers?dateFrom=${startDate}&dateTo=${endDate}`;
  request(url, loadOffersHandler(callback));
}

function loadOffersHandler(callback) {
  return function (error, response, body) {
    const json = JSON.parse(body);
    const bookId = json.data[0].productId;
    loadBookDetails(bookId, callback);
  }
}

function loadBookDetails(bookId, callback) {
  const url = `https://static.packt-cdn.com/products/${bookId}/summary`;
  request(url, loadBookDetailsHandler(callback));
}

function loadBookDetailsHandler(callback) {
  return function (error, response, body) {
    const json = JSON.parse(body);
    callback(json)
  }
} 

module.exports = {
  loadOffers,
  loadBookDetails,
};
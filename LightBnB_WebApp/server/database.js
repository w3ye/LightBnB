const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = `SELECT * FROM users WHERE email = $1;`;
  return pool.query(query, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = `SELECT * FROM users WHERE id = $1;`;
  return pool.query(query, [id])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      return null;
    })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  const query = `
INSERT INTO users (name, email, password)
VALUES
($1, $2, $3)
RETURNING *`;
  return pool.query(query, [name, email, password])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      return err;
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
SELECT *
FROM reservations
JOIN properties ON reservations.property_id = properties.id
WHERE guest_id = $1
LIMIT $2`;
  return pool.query(query, [guest_id, limit])
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })
    .catch(err => {
      return err.message;
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

const emptyArr = (arr) => {
  return arr.length === 0;
};

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    const flag = emptyArr(queryParams);
    queryParams.push(`%${options.city}%`);
    queryString += flag ? 'WHERE ' : ' AND ';
    queryString += `city LIKE $${queryParams.length}`;
  }

  if(options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    const flag = emptyArr(queryParams);
    queryParams.push(options.minimum_price_per_night);
    queryString += flag ? 'WHERE ' : ' AND ';
    queryString += `properties.cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    const flag = emptyArr(queryParams);
    queryParams.push(options.maximum_price_per_night);
    queryString += flag ? 'WHERE ' : ' AND ';
    queryString += `properties.cost_per_night <= $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    const flag = emptyArr(queryParams);
    queryParams.push(options.minimum_rating);
    queryString += 'GROUP BY properties.id '
    queryString += `HAVING avg(property_reviews.rating)  >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += options.minimum_rating ? '' : 'GROUP BY properties.id';
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = {
    text: `
      SELECT * FROM users
      WHERE email = $1 `,
    values: [email]
  };
  return pool.query(query).then(res => {
    if (res.rows.length === 0) {
      return null;
    } else {
      return res.rows[0];
    }
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = {
    text: `
      SELECT * FROM users
      WHERE id = $1 `,
    values: [id]
  };
  return pool.query(query).then(res => {
    if (res.rows.length === 0) {
      return null;
    } else {
      return res.rows[0];
    }
  });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const { name, email, password } = user
  const query = {
    text: `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`,
    values: [name, email, password]
  };
  return pool
  .query(query)
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = {
    text:`
      SELECT properties.*, reservations.*, avg(rating) as average_rating
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id 
      WHERE reservations.guest_id = $1
      AND reservations.end_date < now()::date
      GROUP BY properties.id, reservations.id
      ORDER BY reservations.start_date
      LIMIT ${limit}`,
    values: [guest_id]
  }
  return pool.query(query)
  .then(res => res.rows)


};
exports.getAllReservations = getAllReservations;

/// Properties

const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE LOWER(city) LIKE LOWER($${queryParams.length}) `;
  }


  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    if (queryParams.length !== 1) {
    queryString += ` AND properties.cost_per_night/100 >= $${queryParams.length} `;
  } else {
    queryString += `WHERE properties.cost_per_night/100 >= $${queryParams.length} `;
  }
}


  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    if (queryParams.length !== 1) {
    queryString += ` AND properties.cost_per_night/100 <= $${queryParams.length} `;
  } else {
    queryString += `WHERE properties.cost_per_night/100 <= $${queryParams.length} `;
  }
}


  // 4
  queryString += `
  GROUP BY properties.id`
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(rating) >= $${queryParams.length} `;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // 5
  console.log(queryString, queryParams);

  // 6


  const query = {
    text: queryString,
    values: queryParams
  }
  return pool
    .query(query)
    .then(res => res.rows);
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
};
exports.addProperty = addProperty;

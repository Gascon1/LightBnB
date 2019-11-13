SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON reservations.property_id = properties.id
JOIN property_reviews ON reservations.property_id = properties.id
WHERE end_date < now()::date 
AND property_reviews.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;
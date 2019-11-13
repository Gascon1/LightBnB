INSERT INTO users (name, email, password) 
VALUES ('Mikel', 'mikel@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.')

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 3061, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
(2, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 3, 9, 1, 'Canada', '1650 Hejto Center', 'Bohbatev', 'Alberta', '83680', true),
(3, 'Habit mix', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 82640, 2, 8, 6, 'Canada', '513 Powov Grove', 'Genwezuj', 'Newfoundland', '44583', true)

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 313, 399),
('2019-01-04', '2019-02-01', 515, 628),
('2021-10-01', '2021-10-14', 217, 93)

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 5, 10, 3, message),
VALUES (1, 8, 2, 4, message),
VALUES (4, 6, 5, 5, message),
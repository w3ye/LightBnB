INSERT INTO users (name, email, password)
VALUES
('William Ye', '123@outlook.com', 'BOAVhpuLvpOREQVmvmezD4ED'),
('Marco Polo', 'mpolo@hotmail.com', '$2a$10$FB'),
('Jake Jake', 'jake@gmial.com', '.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(2, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 100, 1, 1, 1, 'Canada', '33 Tiny House Avenue', 'Toronto', 'Ontario', 'M1K 3K2', TRUE),
(1, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1000, 5, 2, 2, 'USA', '1 Forest Drive', 'Cleaveland', 'Ohio', '10234', TRUE),
(1,'Habit mix', 'description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 500, 2, 1, 3, 'South Africa', '3 Derrick Ave', 'Johannesburg', 'Gauteng', '2198', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(1, 1, 1, 5, 'message'),
(2, 2, 2, 5, 'message'),
(3, 3, 3, 5, 'message');

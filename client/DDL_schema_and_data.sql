-- Data Definition Queries
-- Jaime Garcia, Phil Cazella
-- CS340 Introduction to Databases - Oregon State University


--
-- Table structure for table `Customers`
--
DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `date_ordered` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) NOT NULL DEFAULT 'New',
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0',
  `tax` decimal(10,2) NOT NULL DEFAULT '0',
  `total` decimal(10,2) NOT NULL DEFAULT '0',
  `is_paid` int DEFAULT '0',
  `comment` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customers_idx` (`customer_id`),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Table structure for table `Ingredients`
--
DROP TABLE IF EXISTS `Ingredients`;
CREATE TABLE `Ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;


--
-- Table structure for table `Menus`
--
DROP TABLE IF EXISTS `Menus`;
CREATE TABLE `Menus` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Table structure for table `menu_items`
--
DROP TABLE IF EXISTS `Menu_Items`;
CREATE TABLE `Menu_Items` (
  `menu_item_id` int NOT NULL AUTO_INCREMENT,
  `menu_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`menu_item_id`),
  KEY `fk_menu_items_menus1_idx` (`menu_id`),
  CONSTRAINT `fk_menu_items_menus1` FOREIGN KEY (`menu_id`) REFERENCES `Menus` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


--
-- Table structure for table `item_ingredients`
--
DROP TABLE IF EXISTS `Item_Ingredients`;
CREATE TABLE `Item_Ingredients` (
  `item_ingredient_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`item_ingredient_id`),
  KEY `fk_menu_items_has_ingredients_ingredients1_idx` (`ingredient_id`),
  KEY `fk_menu_items_has_ingredients_menu_items1_idx` (`menu_item_id`),
  CONSTRAINT `fk_menu_items_has_ingredients_ingredients1` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredients` (`ingredient_id`),
  CONSTRAINT `fk_menu_items_has_ingredients_menu_items1` FOREIGN KEY (`menu_item_id`) REFERENCES `Menu_Items` (`menu_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `order_items`
--
DROP TABLE IF EXISTS `Order_Items`;
CREATE TABLE `Order_Items` (
  `order_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `menu_item_id` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `qty` int NOT NULL DEFAULT 0,
  `comment` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_orders_has_menu_items_menu_items1_idx` (`menu_item_id`),
  KEY `fk_orders_has_menu_items_orders1_idx` (`order_id`),
  CONSTRAINT `fk_orders_has_menu_items_menu_items1` FOREIGN KEY (`menu_item_id`) REFERENCES `Menu_Items` (`menu_item_id`),
  CONSTRAINT `fk_orders_has_menu_items_orders1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----------------------------------------------------------------------------------------------------
-- INSERT STARTER DATA FOR DEVELOPMENT PURPOSES ONLY
----------------------------------------------------------------------------------------------------

INSERT INTO `Customers` (`customer_id`, `name`, `email`, `password`) VALUES
(1, 'Bob Smith', 'bsmith@cs340.com', 'cs340'),
(2, 'Kathy Jones', 'kjones@cs340.com', 'cs340'),
(3, 'Roger Allens', 'rallens@cs340.com', 'cs340'),
(4, 'Jaime Garcia', 'jaime@email.com', 'databaserocks'),
(5, 'Phillip Cazella', 'Phil@email.com', 'database340'),
(6, 'James Dean', 'James@email.com', 'EastofEden'),
(7, 'Rick Blaine', 'Rick@email.com', 'casablanca'),
(8, 'Inigo Montoya', 'Inigo@email.com', 'IHatePirates');


INSERT INTO `Orders` (`order_id`, `customer_id`, `date_ordered`, `status`, `subtotal`, `tax`, `total`, `is_paid`, `comment`) VALUES
(1, 2, '2020-04-30 00:00:00', 'New', '9.50', '0.75', '0.00', 1, 'No Ice'),
(2, 5, '2020-05-16 00:00:00', 'Ready', '10.00', '0.75', '0.00', 0, 'Need extra sugar'),
(3, 3, '2020-04-17 00:00:00', 'New', '7.57', '0.75', '11.00', 1, 'No comments'),
(5, 4, '2020-03-18 00:00:00', 'New', '10.45', '0.75', '12.00', 1, 'pick up'),
(6, 6, '2020-02-18 00:00:00', 'Ready', '5.57', '0.75', '13.00', 1, 'Dine in'),
(7, 7, '2020-01-19 00:00:00', 'New', '8.57', '0.75', '14.00', 0, 'Arriving in 20 min');


INSERT INTO `Ingredients` (`ingredient_id`, `name`) VALUES
(1, 'Buttermilk pancakes'),
(2, 'Bacon'),
(3, 'Eggs'),
(4, 'Ham'),
(5, 'Hollandaise Sauce'),
(6, 'English Muffin'),
(7, 'Golden Waffles'),
(8, 'Kaiser Roll'),
(9, 'Grilled Chicken'),
(10, 'Lettuce'),
(11, 'Tomato'),
(12, 'Onion'),
(13, 'Peanut Butter'),
(14, 'Grape Jelly'),
(15, 'Quarter Pound Beef Patty'),
(16, 'French Fries'),
(17, 'Fruit Cup'),
(18, 'Rib Eye Steak'),
(19, 'Lobster Tail'),
(20, 'Rice Pilaf'),
(21, 'House Salad'),
(22, 'Spaghetti'),
(23, 'Italian Meatballs'),
(24, 'Tomato Sauce'),
(25, 'Taco seasoned beef'),
(26, 'Salsa'),
(27, 'Shredded Cheese'),
(28, 'Sour Cream'),
(29, 'Guacamole'),
(30, 'Cheddar Cheese');


INSERT INTO `Menus` (`menu_id`, `name`) VALUES
(1, 'Breakfast'),
(2, 'Lunch'),
(3, 'Dinner');


INSERT INTO `Menu_Items` (`menu_item_id`, `menu_id`, `name`, `price`) VALUES
(1, 1, 'Pankakes', '10.95'),
(2, 1, 'Eggs Benedict', '12.95'),
(3, 1, 'Waffles', '9.95'),
(4, 2, 'Grilled Chicken Sandwich', '12.95'),
(5, 2, 'Bacon Cheeseburger', '14.95'),
(6, 2, 'Peanut Butter and Jelly Sandwich', '5.95'),
(7, 3, 'Steak and Lobster', '24.95'),
(8, 3, 'Spaghetti with Meatballs', '14.95'),
(9, 3, 'Taco Salad', '10.95');


INSERT INTO `Item_Ingredients` (`item_ingredient_id`, `menu_item_id`, `ingredient_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 6),
(4, 2, 3),
(5, 2, 5),
(6, 2, 2),
(7, 3, 7),
(8, 3, 2),
(9, 4, 8),
(10, 4, 9),
(11, 4, 10),
(12, 4, 11),
(13, 4, 12),
(14, 5, 8),
(15, 5, 15),
(16, 5, 30),
(17, 5, 10),
(18, 5, 11),
(19, 5, 12),
(20, 5, 16),
(22, 6, 13),
(23, 6, 14),
(24, 6, 17),
(25, 7, 18),
(26, 7, 19),
(27, 7, 20),
(28, 7, 21),
(29, 8, 22),
(30, 8, 23),
(31, 8, 24),
(32, 8, 21),
(33, 9, 10),
(34, 9, 11),
(35, 9, 25),
(36, 9, 26),
(37, 9, 27),
(38, 9, 28),
(39, 9, 29);


INSERT INTO `Order_Items` (`order_item_id`, `order_id`, `menu_item_id`, `price`, `qty`, `comment`) VALUES
(1, 3, 5, '15.00', 2, 'Customer will pass by in 25 min!'),
(2, 1, 2, '6.00', 1, 'No comments'),
(3, 2, 3, '8.00', 2, 'Angry customer - Hurry up'),
(4, 3, 6, '13.00', 2, 'Extra forks please!'),
(5, 5, 6, '9.00', 1, 'extra forks');

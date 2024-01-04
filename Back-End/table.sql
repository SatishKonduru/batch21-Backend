create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(100),
    contactNumber varchar(50),
    email varchar(100),
    password varchar(100),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);


insert into user (
    name, contactNumber, email, password, status, role
) values (
    'admin','9182256249','rskhelpline@gmail.com','admin','true','admiin'
);


create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

insert into category (name) values ('mobiles');
insert into category (name) values ('fashion');


create table bill (
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(255) NOT NULL,
    primary key(id)
);
CREATE TABLE users (
    userid serial UNIQUE NOT NULL,
    firstname character varying(200) NOT NULL,
    lastname character varying(200) NOT NULL,
    email character varying(255) UNIQUE NOT NULL,
    password character varying(50) NOT NULL,


);


CREATE TABLE posts (
    postid serial UNIQUE NOT NULL,
    amount numeric NOT NULL,
    currency character varying(5) NOT NULL,
    location character varying(50) NOT NULL,
    notes character varying(255),
    valueInUSD numeric NOT NULL,
    selleremail character varying(255) NOT NULL,
    sellername character varying(200) NOT NULL,
    sellerid numeric NOT NULL
    
);
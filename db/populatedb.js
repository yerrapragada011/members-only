#!/usr/bin/env node

require('dotenv').config()

const { Client } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255),
  username VARCHAR(320),
  password VARCHAR(255),
  membership_status BOOLEAN,
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  timestamp DATE,
  message VARCHAR(255),
  user_id INT,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Insert sample data into users table
INSERT INTO users (fullname, username, password, membership_status, admin) 
VALUES
  ('John Doe', 'johndoe', 'password123', FALSE, FALSE),
  ('Jane Smith', 'janesmith', 'password456', FALSE, FALSE),
  ('Alice Johnson', 'alicejohnson', 'password789', FALSE, FALSE);

-- Insert sample data into messages table
INSERT INTO messages (title, timestamp, message, user_id) 
VALUES
  ('Welcome Message', '2024-08-09', 'Welcome to the platform!', 1),
  ('Reminder', '2024-08-10', 'Dont forget to update your profile.', 2),
  ('New Features', '2024-08-11', 'Check out our new features.', 3);
`

async function main() {
  console.log('Seeding...')
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log('Done')
}

main()

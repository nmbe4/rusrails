-- Create additional databases for RusRails
-- The main database is created by POSTGRES_DB environment variable

-- Create test database
CREATE DATABASE rusrails_test;

-- Grant permissions to postgres user
GRANT ALL PRIVILEGES ON DATABASE rusrails_development TO postgres;
GRANT ALL PRIVILEGES ON DATABASE rusrails_test TO postgres;

-- Create extensions (if needed)
\c rusrails_development;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c rusrails_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

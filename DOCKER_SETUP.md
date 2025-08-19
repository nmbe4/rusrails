# 🐳 PostgreSQL Docker Setup for RusRails

This setup provides a containerized PostgreSQL database for development with optional pgAdmin for database management.

## 🚀 Quick Start

```bash
# First-time setup (starts DB + creates schema + imports data)
./bin/docker-db setup

# Daily development
./bin/docker-db start    # Start PostgreSQL
rails server             # Start Rails (in another terminal)
```

## 📋 Prerequisites

- Docker & Docker Compose installed
- Ruby and Rails already set up

## 🛠️ Available Commands

### Basic Operations
```bash
./bin/docker-db start      # Start PostgreSQL only
./bin/docker-db stop       # Stop all containers
./bin/docker-db restart    # Restart PostgreSQL
./bin/docker-db status     # Show container status
```

### Database Management
```bash
./bin/docker-db shell      # Connect to PostgreSQL shell (psql)
./bin/docker-db logs       # View PostgreSQL logs
./bin/docker-db backup     # Create database backup
./bin/docker-db restore backup.sql  # Restore from backup
./bin/docker-db reset      # ⚠️  DANGER: Reset database (deletes all data)
```

### With pgAdmin (Optional)
```bash
./bin/docker-db start-all  # Start PostgreSQL + pgAdmin
./bin/docker-db pgadmin    # Open pgAdmin in browser
```

## 🔗 Connection Details

### PostgreSQL
- **Host**: localhost
- **Port**: 5434
- **Database**: rusrails_development
- **Username**: postgres
- **Password**: mysecretpassword
- **URL**: `postgresql://postgres:mysecretpassword@localhost:5434/rusrails_development`

### pgAdmin (when enabled)
- **URL**: http://localhost:5050
- **Email**: admin@rusrails.local
- **Password**: admin123

## 📁 File Structure

```
├── docker-compose.yml              # Docker services configuration
├── docker/
│   └── postgres/
│       └── init/
│           └── 01-create-databases.sql  # Database initialization
├── bin/
│   └── docker-db                   # Database management script
└── config/
    └── database.yml                # Rails database configuration
```

## 🔧 Configuration

Your current `config/database.yml` should work without changes:

```yaml
development:
  adapter: postgresql
  host: localhost
  port: 5434
  encoding: unicode
  database: rusrails_development
  pool: 5
  username: postgres
  password: 'mysecretpassword'
```

## 🚀 First-Time Setup

1. **Start the containers**:
   ```bash
   ./bin/docker-db setup
   ```

2. **Verify connection**:
   ```bash
   ./bin/docker-db shell
   # In psql: \l (list databases), \q (quit)
   ```

3. **Start Rails**:
   ```bash
   rails server
   ```

## 📊 Container Details

### PostgreSQL Container
- **Image**: postgres:15-alpine
- **Container**: rusrails_postgres
- **Volume**: postgres_data (persistent storage)
- **Health Check**: Built-in readiness check

### pgAdmin Container (Optional)
- **Image**: dpage/pgadmin4:latest
- **Container**: rusrails_pgadmin
- **Volume**: pgadmin_data (persistent storage)
- **Profile**: pgadmin (only starts with `start-all` command)

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Check what's using port 5434
lsof -i :5434

# Stop local PostgreSQL if running
brew services stop postgresql  # macOS
sudo service postgresql stop   # Linux
```

### Container Won't Start
```bash
# Check Docker status
docker ps -a

# View container logs
docker-compose logs postgres

# Reset containers
docker-compose down -v  # ⚠️  Deletes data volumes
./bin/docker-db start
```

### Permission Issues
```bash
# Reset Docker volumes
docker-compose down -v
docker volume prune
./bin/docker-db setup
```

### Database Connection Errors
```bash
# Verify PostgreSQL is ready
./bin/docker-db status

# Test connection
./bin/docker-db shell

# Check Rails database config
rails db:version
```

## 💾 Data Persistence

- Database data is stored in Docker volume `postgres_data`
- Data persists between container restarts
- To completely reset: `docker-compose down -v`

## 🔒 Security Notes

- **Development only**: Default passwords are for development
- **Production**: Change passwords and use environment variables
- **Network**: Containers are isolated in `rusrails_network`

## 📚 Useful Commands

```bash
# View all volumes
docker volume ls

# Check PostgreSQL version
./bin/docker-db shell -c "SELECT version();"

# View database size
./bin/docker-db shell -c "SELECT pg_size_pretty(pg_database_size('rusrails_development'));"

# List all tables
./bin/docker-db shell -c "\dt"
```

Enjoy your containerized PostgreSQL setup! 🎉

# web-security-sql-injection-lab
Demonstration of SQL Injection vulnerability in a web application and implementation of secure authentication using parameterized queries.

## Project Setup Milestones

### Completed Actions
1. **Repository Setup**: Initialized local project and connected it to the remote GitHub repository (`nishtha911/web-security-sql-injection-lab`).
2. **Backend Boilerplate**: 
   - Created the `backend` folder.
   - Initialized `package.json` for a Node application.
   - Installed essential packages: `express`, `body-parser`, `cors`, and `mysql2`.
3. **Database Configuration**:
   - Switched from SQLite to MySQL for the primary database engine.
   - Written a basic `server.js` file connecting to a local MySQL instance (database: `ecommerce_lab`) and capable of auto-creating `users` and `products` tables.

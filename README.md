# 🏆 Football Data API
🚀 **GraphQL API to import and query football data** from the [Football Data API](https://www.football-data.org/) using Prisma and Apollo Server.

## 📜 Table of Contents
- [📖 About the Project](#-about-the-project)
- [🛠 Technologies Used](#-technologies-used)
- [⚙️ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [📡 API Documentation](#-api-documentation)
- [📝 Project Structure](#-project-structure)
- [🎯 Future Improvements](#-future-improvements)
- [🧑‍💻 Author](#-author)

---

## 📖 About the Project
The **Football Data API** provides a **GraphQL-based solution** for retrieving football data. It imports **competitions, teams, players, and coaches** from the [Football Data API](https://www.football-data.org/) and stores them in a **local database** using Prisma.

> 📌 **Requirement:** The API must fetch data from `football-data.org` (API v4), store it locally, and expose it via GraphQL.

---

## 🛠 Technologies Used
| **Technology** | **Purpose** |
|---------------|------------|
| **Node.js** | Backend runtime |
| **TypeScript** | Type safety |
| **Apollo Server** | GraphQL API |
| **Prisma** | Database ORM |
| **PostgreSQL** | Database |
| **Axios** | HTTP requests |
| **Bottleneck** | Rate limiting |
| **Jest** | Unit testing |
| **Docker** | Containerization |

---

## ⚙️ Features
✔ **Import Leagues**: Fetch and store competition, teams, players, and coaches from `football-data.org`.  
✔ **Query Competitions**: Retrieve available competitions with associated teams.  
✔ **Query Teams**: Get teams by name or by competition.  
✔ **Query Players**: List all players from a league or a specific team.  
✔ **Database Persistence**: Stores data locally using Prisma and PostgreSQL.  
✔ **Rate Limiting**: Prevents exceeding API request limits using Bottleneck.  
✔ **Error Handling**: Gracefully manages API failures and missing data.

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (optional, for PostgreSQL)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)
- A **free API key** from [football-data.org](https://www.football-data.org/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/Micovick/Football-Data-API.git
cd Football-Data-API
```

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```sh
DATABASE_URL=postgresql://user:password@localhost:5432/football
FOOTBALL_API_KEY=your_api_key_here
```

### 5️⃣ Set Up the Database
If using **Docker**, run:
```sh
docker-compose up -d
```
Otherwise, ensure PostgreSQL is running and execute:
```sh
npm run prisma:migrate
```

### 6️⃣ Start the Server
```sh
npm run dev
```
Server should be running at:
```
🚀 Server ready at http://localhost:4000/graphql
```

---

## 📡 API Documentation
> 💡 Use [Apollo Sandbox](https://studio.apollographql.com/sandbox) or [GraphQL Playground](https://www.graphql.com/graphiql/) for testing queries.

### 🟢 Query: Get All Competitions
```graphql
query {
  competitions {
    name
    code
    teams {
      name
    }
  }
}
```

### 🟢 Query: Get Teams by Competition
```graphql
query {
  teams(competitionCode: "PL") {
    name
    squad {
      name
      position
    }
    coach {
      name
    }
  }
}
```

### 🟢 Query: Get Players by Competition
```graphql
query {
  players(competitionCode: "PL") {
    name
    position
    nationality
  }
}
```

### 🟡 Mutation: Import a League
```graphql
mutation {
  importLeague(leagueCode: "PL")
}
```
📌 **Response:**
```json
{
  "data": {
    "importLeague": "League Premier League imported successfully"
  }
}
```

---

## 📝 Project Structure
```
📂 src/
 ├── 📂 graphql/             # GraphQL schemas & resolvers
 │   ├── 📂 resolvers        # Resolvers entry point
 │   ├── 📂 schemas          # GraphQL schema definitions
 ├── 📂 services/            # Business logic (API calls & DB interactions)
 │   ├── football.service.ts # Calls football-data.org API
 │   ├── import.service.ts   # Imports league data
 ├── 📂 prisma/              # Database configuration
 ├── 📂 __tests__/           # Unit & integration tests
 ├── app.ts                  # Apollo server setup
 ├── server.ts               # Server startup
 ├── package.json            # Dependencies & scripts
 └── README.md               # Documentation
```

---

## 🎯 Future Improvements
✅ **Improve Caching:** Store frequently accessed data in Redis.  
✅ **Add Authentication:** Secure API access with API keys or JWT.  
✅ **Webhooks for Updates:** Notify clients when new data is imported.  
✅ **GraphQL Subscriptions:** Enable real-time updates for new players/teams.  
✅ **More Queries & Filters:** Advanced search and filtering options.

---

## 🧑‍💻 Author
**Euclides Cardoso Júnior**  
📧 **Email:** euclides.c.jr@gmail.com  
🔗 **GitHub:** [Micovick](https://github.com/Micovick)

---

### 🚀 Ready to Play?
> Clone the repo, get an API key, and start exploring football data with GraphQL! ⚽🔥

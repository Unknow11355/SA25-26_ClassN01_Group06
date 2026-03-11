🎬 Movie Booking Online System
📖 Project Overview
The Movie Booking Online System project aims to build a comprehensive online cinema ticket reservation system. Furthermore, the project clearly illustrates the Software Architecture Evolution from a Layered Monolith model to a Microservices ecosystem combined with Event-Driven Architecture (EDA).

This project serves as a major assignment for the Software Architecture course at the Faculty of Information Technology, Phenikaa University.

👥 Development Team: Group 06
Trần Hữu Kiên - 23010258 (Phase 1: Monolith Architecture)

Nguyễn Đình Quyền - 23010482 (Phase 2: Microservices & API Gateway)

Instructor: Vũ Quang Dũng

🛠 Tech Stack
Backend Runtime: Node.js

Framework: Express.js

Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API)

Database: JSON File System (users.json, movies.json, bookings.json) – Used to simulate a Document-based DB for Rapid Prototyping.

Message Broker: RabbitMQ (via amqplib for asynchronous processing).

API Gateway: http-proxy-middleware

🏗 System Architecture
The project was developed in two strategic phases to address Non-Functional Requirements (NFRs) and Architecturally Significant Requirements (ASRs):

Phase 1: Layered Monolith (Legacy System)
The application runs on a single process (Port 3000).

Implements a 3-Tier Layered Architecture: Controller → Service → Repository.

Features: Registration/Login, Movie Catalog Management.

Phase 2: Microservices Ecosystem (Modern System)
To resolve performance bottlenecks and ensure Fault Isolation for high-traffic booking functions:

API Gateway (Port 5000): Acts as the Single Entry Point for all clients. Handles request routing and dispatching.

Legacy Service (Port 3000): Manages the UI, Authentication, and Movie display.

Booking Service (Port 5002): A completely decoupled Core Microservice with its own dedicated database (bookings.json).

RabbitMQ (Event-Driven): Handles Asynchronous tasks, such as sending confirmation emails via the BOOKING_CREATED event, significantly reducing API latency.

🚀 How to Run
Prerequisites
Node.js installed (v14.x or higher).

Docker installed and running (to host the RabbitMQ container).

Step 1: Start the Message Broker (RabbitMQ)
Open your terminal and run the following command to initialize the RabbitMQ container:

Bash
docker run -d --hostname rabbitmq-host --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

Step 2: Install Dependencies
Navigate to the root directory of each service and install the required packages:

Bash
# Install for API Gateway
cd api-gateway && npm install

# Install for Legacy Service
cd legacy-service && npm install

# Install for Booking Service
cd booking-service && npm install

Step 3: Launch Services
Open three separate terminals and run each service in order:

Legacy Service (Port 3000): cd legacy-service && node server.js

Booking Service (Port 5002): cd booking-service && node server.js

API Gateway (Port 5000): cd api-gateway && node gateway.js

Step 4: Access the Application
Open your browser and navigate to the API Gateway: http://localhost:5000.

Note: Clients must communicate exclusively through the API Gateway. Do not call Backend ports (3000/5002) directly.

🧪 Testing Scenarios
Data Flow Testing: Register an account and verify that data is correctly persisted in data/users.json.

Gateway Routing Testing: Send a booking request (POST /booking) through the Gateway and observe the routing logs (Proxy created -> Port 5000).

Fault Isolation Testing (Kill Switch): Abruptly terminate the Booking Service process. Reload the homepage and login page to ensure the Legacy application remains functional, demonstrating fault isolation.

Asynchronous Testing (RabbitMQ): Complete a booking and verify the API latency (under 50ms), while checking the logs for the background process: [Event Bus] Publishing event: BOOKING_CREATED.

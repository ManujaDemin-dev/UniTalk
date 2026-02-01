
---

## 🌐 WebSocket – Clean Study Notes

### 🧰 Tech Stack

- **Node.js**
    
- **PostgreSQL**
    
- **Express**
    
- **React**
    
- **WebSockets**
    
- **Drizzle ORM** (Type safety)
    
- **Arcjet** (DDoS protection)
    

---

## 🔄 Polling

**Polling** is an old HTTP-based technique where the client repeatedly asks the server for updates.

### ❌ Why is polling inefficient?

- Every request sends **large headers** (GET/POST)
    
- High network overhead for **small data changes**
    
- Wastes server resources
    
- Introduces unnecessary latency
    

---

## 🌍 HTTP Limitations

HTTP is a **Request–Response** protocol.

### ✅ Good for:

- Websites
    
- REST APIs
    
- Page loading
    

### ❌ Bad for:

- Real-time systems
    
- Fast back-and-forth communication
    
- Chats, games, live dashboards
    

---

## 🔁 Full Duplex Communication

WebSockets allow **full-duplex communication**, meaning:

- Client and server can **send & receive data at the same time**
    
- No need to wait for a request to respond
    

📌 _(Diagram reference)_  


---

## 🤝 WebSocket Handshake

WebSockets start as HTTP, then **upgrade** the connection.

### Handshake Flow:

1. Client sends HTTP request with `Upgrade: websocket`
    
2. Server responds with **101 Switching Protocols**
    
3. HTTP connection upgrades to a WebSocket tunnel
    

📌 _(Diagram reference)_  
![[Pasted image 20260201160650.png]]

---

## 🏗️ WebSocket Architecture

1. **Connection** – Client initiates request
    
2. **Upgrade** – HTTP → WebSocket (`101 Switching Protocols`)
    
3. **State** – Persistent, bidirectional connection
    

---

## 👻 Ghost Connections

A **ghost connection** happens when a client disconnects improperly but the server still thinks it’s connected.

### ⚠️ Problems:

- Memory leaks
    
- Wasted resources
    
- Server overload
    

### ✅ Fix: Ping–Pong (Heartbeat)

- Server sends **ping**
    
- Client responds with **pong**
    
- If no response → close connection
    

---

## 📦 Data Transfer

WebSockets support **two types of data**:

### 1. Text (JSON)

- Easy to implement
    
- Human-readable
    
- Easy to debug and monitor
    

### 2. Binary (RAW)

- Faster
    
- Smaller payloads
    
- Used in:
    
    - Multiplayer games
        
    - Media streaming
        
    - High-performance systems
        

---

## 🏷️ OPCODE

**Opcode** tells WebSocket how to interpret the data frame.

Common OPCodes:

- `Text`
    
- `Binary`
    
- `Close`
    
- `Ping`
    
- `Pong`
    

---

## 🚦 Backpressure

**Backpressure** is when the system slows down data flow to prevent overload.

### Purpose:

- Prevent memory overflow
    
- Maintain stability
    
- Improve overall performance
    

---

## 🔄 WebSocket Life Cycle

1. **Connecting**
    
    - Connection is being established
        
    - Not ready to send data
        
2. **Open**
    
    - Safe zone 🚀
        
    - Full duplex communication available
        
3. **Closing**
    
    - Connection is in the process of shutting down
        
4. **Closed**
    
    - Connection fully terminated ❌
        

📌 _(Diagram reference)_  
![[Pasted image 20260201162941.png]]

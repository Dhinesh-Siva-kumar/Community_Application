# API INTEGRATION GUIDE
## Community Platform Backend Specification

**Version:** 1.0  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Backend Development Team, Frontend Integration Team  
**Base URL:** `https://api.community-app.com/v1`

---

## TABLE OF CONTENTS

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Data Models](#data-models)
4. [Authentication Endpoints](#authentication-endpoints)
5. [User Endpoints](#user-endpoints)
6. [Community Endpoints](#community-endpoints)
7. [Post Endpoints](#post-endpoints)
8. [Event Endpoints](#event-endpoints)
9. [Job Endpoints](#job-endpoints)
10. [Business Endpoints](#business-endpoints)
11. [Location Endpoints](#location-endpoints)
12. [Admin Endpoints](#admin-endpoints)
13. [Error Handling](#error-handling)
14. [Rate Limiting](#rate-limiting)
15. [Pagination](#pagination)

---

## API OVERVIEW

### Protocol
- **HTTPS Only** (TLS 1.2+)
- **Version:** v1
- **Data Format:** JSON
- **Accept Header:** `application/json`
- **Content-Type:** `application/json`

### Standard Response Format

**Success (2xx):**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional message"
}
```

**Error (4xx, 5xx):**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": { /* optional details */ }
  },
  "timestamp": "2026-03-21T10:30:00Z"
}
```

---

## AUTHENTICATION

### JWT Tokens

The API uses JWT (JSON Web Tokens) for authentication.

**Token Format:**
- Access Token: 15 minutes expiry
- Refresh Token: 7 days expiry
- Both tokens returned in login response

**Token Storage (Client):**
- Access Token: LocalStorage or Memory
- Refresh Token: HttpOnly Secure Cookie

**Token Refresh Flow:**
```
1. Client detects 401 Unauthorized
2. Client sends Refresh Token to /auth/refresh endpoint
3. Server validates and returns new Access Token
4. Client retries original request with new token
5. If refresh fails, redirect to login
```

### Authorization Header

```
Authorization: Bearer <access_token>
```

**Scope-based Permissions:**
- `read:profile` - Read user profile
- `write:profile` - Update user profile
- `write:community` - Create/edit communities
- `write:post` - Create/edit posts
- `admin` - Admin access

---

## DATA MODELS

### User Model

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "avatar_url": "https://cdn.example.com/avatars/user_id.jpg",
  "bio": "Community enthusiast",
  "postcode": "SW1A 1AA",
  "location": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "district": "Westminster",
    "latitude": 51.5007,
    "longitude": -0.1246
  },
  "interests": ["Technology", "Sports", "Community"],
  "role": "user",
  "status": "active",
  "email_verified": true,
  "email_verified_at": "2026-01-15T10:30:00Z",
  "two_factor_enabled": false,
  "created_at": "2026-01-01T08:00:00Z",
  "updated_at": "2026-03-21T10:30:00Z",
  "last_login": "2026-03-21T10:30:00Z"
}
```

### Community Model

```json
{
  "id": "uuid",
  "name": "Tech Community",
  "description": "A place for tech enthusiasts to connect",
  "category": "Technology",
  "postcode": "SW1A 1AA",
  "location": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "latitude": 51.5007,
    "longitude": -0.1246
  },
  "cover_image_url": "https://cdn.example.com/covers/community_id.jpg",
  "avatar_url": "https://cdn.example.com/avatars/community_id.jpg",
  "member_count": 1250,
  "post_count": 456,
  "created_by": "uuid",
  "created_at": "2025-12-01T08:00:00Z",
  "updated_at": "2026-03-21T10:30:00Z",
  "rules": ["Be respectful", "No spam", "Keep it local"],
  "is_private": false,
  "is_verified": true
}
```

### Post Model

```json
{
  "id": "uuid",
  "community_id": "uuid",
  "user_id": "uuid",
  "title": "Great local event",
  "content": "Post content here...",
  "image_urls": ["url1", "url2"],
  "created_at": "2026-03-21T10:30:00Z",
  "updated_at": "2026-03-21T10:30:00Z",
  "like_count": 45,
  "comment_count": 12,
  "is_liked": false,
  "user": {
    "id": "uuid",
    "full_name": "John Doe",
    "avatar_url": "url"
  }
}
```

### Event Model

```json
{
  "id": "uuid",
  "title": "Tech Meetup",
  "description": "Monthly tech meetup for local developers",
  "date": "2026-04-15",
  "time": "18:00",
  "postcode": "SW1A 1AA",
  "location": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "address": "123 Main St, London",
    "latitude": 51.5007,
    "longitude": -0.1246
  },
  "image_url": "https://cdn.example.com/events/event_id.jpg",
  "category": "Technology",
  "organizer_id": "uuid",
  "organizer": {
    "id": "uuid",
    "full_name": "Jane Smith",
    "avatar_url": "url"
  },
  "max_attendees": 50,
  "attendee_count": 24,
  "is_attending": false,
  "created_at": "2026-03-20T08:00:00Z",
  "updated_at": "2026-03-21T10:30:00Z"
}
```

### Job Model

```json
{
  "id": "uuid",
  "title": "Senior Developer",
  "description": "We are hiring a senior developer...",
  "company": "Tech Corp",
  "company_id": "uuid",
  "postcode": "SW1A 1AA",
  "location": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "address": "456 Tech Lane"
  },
  "salary_min": 45000,
  "salary_max": 65000,
  "salary_currency": "GBP",
  "type": "Full-time",
  "category": "Technology",
  "requirements": ["5+ years experience", "Angular expertise"],
  "posted_by": "uuid",
  "created_at": "2026-03-20T08:00:00Z",
  "application_count": 12,
  "is_applied": false,
  "featured": false
}
```

### Business Model

```json
{
  "id": "uuid",
  "name": "Coffee Shop",
  "description": "Best coffee in town",
  "category": "Food & Beverage",
  "postcode": "SW1A 1AA",
  "location": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "address": "789 High St, London",
    "latitude": 51.5007,
    "longitude": -0.1246
  },
  "phone": "020 1234 5678",
  "website": "https://coffee.example.com",
  "hours": "Mon-Fri 8AM-6PM, Sat-Sun 9AM-5PM",
  "image_urls": ["url1", "url2", "url3"],
  "rating": 4.5,
  "review_count": 87,
  "owner_id": "uuid",
  "verified": true,
  "created_at": "2026-01-10T08:00:00Z",
  "updated_at": "2026-03-21T10:30:00Z"
}
```

### Comment Model

```json
{
  "id": "uuid",
  "post_id": "uuid",
  "user_id": "uuid",
  "content": "Great post!",
  "created_at": "2026-03-21T10:30:00Z",
  "updated_at": "2026-03-21T10:30:00Z",
  "like_count": 5,
  "is_liked": false,
  "user": {
    "id": "uuid",
    "full_name": "Jane Smith",
    "avatar_url": "url"
  }
}
```

### Location Model

```json
{
  "postcode": "SW1A 1AA",
  "area": "London",
  "district": "Westminster",
  "region": "Greater London",
  "country": "United Kingdom",
  "latitude": 51.5007,
  "longitude": -0.1246,
  "is_valid": true
}
```

---

## AUTHENTICATION ENDPOINTS

### Register User

```
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "postcode": "SW1A 1AA",
  "interests": ["Technology", "Sports"]
}

Response (201 Created):
{
  "success": true,
  "data": {
    "user_id": "uuid",
    "email": "user@example.com",
    "message": "Verification email sent"
  }
}
```

### Login User

```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "access_token": "jwt_token_here",
    "refresh_token": "refresh_token_here",
    "expires_in": 900,
    "user": { /* User object */ }
  }
}
```

### Refresh Token

```
POST /auth/refresh
Content-Type: application/json
Cookie: refresh_token=token_here

Response (200 OK):
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token",
    "expires_in": 900
  }
}
```

### Logout

```
POST /auth/logout
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Forgot Password

```
POST /auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "user@example.com"
}

Response (200 OK):
{
  "success": true,
  "message": "Password reset email sent"
}
```

### Reset Password

```
POST /auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset_token_from_email",
  "password": "NewSecurePass123!"
}

Response (200 OK):
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Verify Email

```
POST /auth/verify-email
Content-Type: application/json

Request Body:
{
  "token": "verification_token_from_email"
}

Response (200 OK):
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## USER ENDPOINTS

### Get Current User Profile

```
GET /users/me
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* User object */ }
}
```

### Get User Profile by ID

```
GET /users/:user_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* User object */ }
}
```

### Update User Profile

```
PUT /users/me
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "full_name": "Jane Doe",
  "bio": "New bio",
  "postcode": "N1 1AA",
  "interests": ["Technology", "Community"]
}

Response (200 OK):
{
  "success": true,
  "data": { /* Updated User object */ }
}
```

### Upload Avatar

```
POST /users/me/avatar
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Form Data:
- file: <image_file> (max 5MB, jpg/png)

Response (200 OK):
{
  "success": true,
  "data": {
    "avatar_url": "https://cdn.example.com/avatars/user_id.jpg"
  }
}
```

### Get User's Communities

```
GET /users/me/communities?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Community objects */ }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

### Get User's Posts

```
GET /users/:user_id/posts?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Post objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Get User's Events

```
GET /users/:user_id/events?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Event objects */ }
  ],
  "pagination": { /* ... */ }
}
```

---

## COMMUNITY ENDPOINTS

### List Communities

```
GET /communities?page=1&limit=20&category=Technology
Authorization: Bearer <access_token>

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- category: string (optional)
- sort: string (default: 'popular') [popular, newest, member_count]

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Community objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Search Communities by Location

```
GET /communities/search?postcode=SW1A1AA&radius=10
Authorization: Bearer <access_token>

Query Parameters:
- postcode: string (required)
- radius: number (default: 10, in km)
- category: string (optional)
- page: number (default: 1)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      ...community,
      "distance_km": 1.2
    }
  ],
  "pagination": { /* ... */ }
}
```

### Get Community Detail

```
GET /communities/:community_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Community object */ }
}
```

### Create Community

```
POST /communities
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "name": "Tech Community",
  "description": "A place for tech enthusiasts",
  "category": "Technology",
  "postcode": "SW1A 1AA",
  "is_private": false
}

Response (201 Created):
{
  "success": true,
  "data": { /* Created Community object */ }
}
```

### Update Community

```
PUT /communities/:community_id
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "name": "Updated Name",
  "description": "Updated description",
  "category": "Technology"
}

Response (200 OK):
{
  "success": true,
  "data": { /* Updated Community object */ }
}
```

### Delete Community

```
DELETE /communities/:community_id
Authorization: Bearer <access_token>

Response (204 No Content)
```

### Join Community

```
POST /communities/:community_id/join
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "message": "Joined community successfully"
}
```

### Leave Community

```
POST /communities/:community_id/leave
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "message": "Left community successfully"
}
```

### Get Community Members

```
GET /communities/:community_id/members?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* User objects (minimal) */ }
  ],
  "pagination": { /* ... */ }
}
```

---

## POST ENDPOINTS

### Create Post

```
POST /posts
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "community_id": "uuid",
  "title": "Great local event",
  "content": "Post content here...",
  "image_urls": ["url1", "url2"]
}

Response (201 Created):
{
  "success": true,
  "data": { /* Created Post object */ }
}
```

### Get Community Posts

```
GET /communities/:community_id/posts?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Post objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Get Post Detail

```
GET /posts/:post_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Post object with comments */ }
}
```

### Update Post

```
PUT /posts/:post_id
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "title": "Updated title",
  "content": "Updated content"
}

Response (200 OK):
{
  "success": true,
  "data": { /* Updated Post object */ }
}
```

### Delete Post

```
DELETE /posts/:post_id
Authorization: Bearer <access_token>

Response (204 No Content)
```

### Like Post

```
POST /posts/:post_id/like
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": {
    "liked": true,
    "like_count": 46
  }
}
```

### Unlike Post

```
DELETE /posts/:post_id/like
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": {
    "liked": false,
    "like_count": 45
  }
}
```

---

## EVENT ENDPOINTS

### List Events

```
GET /events?page=1&limit=20&date_from=2026-04-01
Authorization: Bearer <access_token>

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- date_from: string (YYYY-MM-DD, optional)
- date_to: string (YYYY-MM-DD, optional)
- category: string (optional)

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Event objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Search Events by Location

```
GET /events/search?postcode=SW1A1AA&radius=10&date_from=2026-04-01
Authorization: Bearer <access_token>

Query Parameters:
- postcode: string (required)
- radius: number (default: 10, in km)
- date_from: string (optional)
- page: number (default: 1)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      ...event,
      "distance_km": 1.2
    }
  ],
  "pagination": { /* ... */ }
}
```

### Create Event

```
POST /events
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "title": "Tech Meetup",
  "description": "Monthly meetup",
  "date": "2026-04-15",
  "time": "18:00",
  "postcode": "SW1A 1AA",
  "address": "123 Main St",
  "category": "Technology",
  "max_attendees": 50
}

Response (201 Created):
{
  "success": true,
  "data": { /* Created Event object */ }
}
```

### Get Event Detail

```
GET /events/:event_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Event object */ }
}
```

### Update Event

```
PUT /events/:event_id
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "title": "Updated title",
  "date": "2026-04-16"
}

Response (200 OK):
{
  "success": true,
  "data": { /* Updated Event object */ }
}
```

### RSVP to Event

```
POST /events/:event_id/rsvp
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": {
    "attending": true,
    "attendee_count": 25
  }
}
```

### Cancel RSVP

```
DELETE /events/:event_id/rsvp
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": {
    "attending": false,
    "attendee_count": 24
  }
}
```

### Get Event Attendees

```
GET /events/:event_id/attendees?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    { /* User objects (minimal) */ }
  ],
  "pagination": { /* ... */ }
}
```

---

## JOB ENDPOINTS

### List Jobs

```
GET /jobs?page=1&limit=20&type=Full-time
Authorization: Bearer <access_token>

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- type: string (optional) [Full-time, Part-time, Contract, Freelance]
- category: string (optional)
- sort: string (default: 'newest') [newest, salary_high, salary_low]

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Job objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Search Jobs by Location

```
GET /jobs/search?postcode=SW1A1AA&radius=10
Authorization: Bearer <access_token>

Query Parameters:
- postcode: string (required)
- radius: number (default: 10)
- salary_min: number (optional)
- salary_max: number (optional)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      ...job,
      "distance_km": 1.2
    }
  ],
  "pagination": { /* ... */ }
}
```

### Post Job

```
POST /jobs
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "title": "Senior Developer",
  "description": "We are hiring...",
  "company": "Tech Corp",
  "postcode": "SW1A 1AA",
  "salary_min": 45000,
  "salary_max": 65000,
  "type": "Full-time",
  "category": "Technology",
  "requirements": ["5+ experience", "Angular"]
}

Response (201 Created):
{
  "success": true,
  "data": { /* Created Job object */ }
}
```

### Get Job Detail

```
GET /jobs/:job_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Job object */ }
}
```

### Apply to Job

```
POST /jobs/:job_id/apply
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "cover_letter": "I am interested in this position..."
}

Response (201 Created):
{
  "success": true,
  "data": {
    "application_id": "uuid",
    "status": "submitted"
  }
}
```

---

## BUSINESS ENDPOINTS

### List Businesses

```
GET /businesses?page=1&limit=20&category=Food&Beverage
Authorization: Bearer <access_token>

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- category: string (optional)
- sort: string (default: 'popular') [popular, rating, newest]

Response (200 OK):
{
  "success": true,
  "data": [
    { /* Business objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Search Businesses by Location

```
GET /businesses/search?postcode=SW1A1AA&radius=10
Authorization: Bearer <access_token>

Query Parameters:
- postcode: string (required)
- radius: number (default: 10)
- category: string (optional)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      ...business,
      "distance_km": 0.8
    }
  ],
  "pagination": { /* ... */ }
}
```

### Get Business Detail

```
GET /businesses/:business_id
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Business object */ }
}
```

### Get Business Reviews

```
GET /businesses/:business_id/reviews?page=1&limit=20
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Great service!",
      "user": { /* User minimal */ },
      "created_at": "2026-03-21T10:30:00Z"
    }
  ],
  "pagination": { /* ... */ }
}
```

### Add Business Review

```
POST /businesses/:business_id/reviews
Authorization: Bearer <access_token>
Content-Type: application/json

Request Body:
{
  "rating": 5,
  "comment": "Great service and friendly staff!"
}

Response (201 Created):
{
  "success": true,
  "data": {
    "review_id": "uuid",
    "rating": 5,
    "comment": "Great service..."
  }
}
```

---

## LOCATION ENDPOINTS

### Validate Postcode

```
POST /location/validate
Content-Type: application/json

Request Body:
{
  "postcode": "SW1A 1AA"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "postcode": "SW1A 1AA",
    "area": "London",
    "district": "Westminster",
    "latitude": 51.5007,
    "longitude": -0.1246,
    "is_valid": true
  }
}
```

### Get Location Data

```
GET /location/:postcode
Authorization: Bearer <access_token>

Response (200 OK):
{
  "success": true,
  "data": { /* Location object */ }
}
```

### Get Nearby Postcodes

```
GET /location/:postcode/nearby?radius=10
Authorization: Bearer <access_token>

Query Parameters:
- radius: number (in km, default: 10)

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "postcode": "N1 1AA",
      "area": "London",
      "distance_km": 2.5
    }
  ]
}
```

---

## ADMIN ENDPOINTS

### Get Admin Dashboard Stats

```
GET /admin/dashboard
Authorization: Bearer <access_token>
Role: admin

Response (200 OK):
{
  "success": true,
  "data": {
    "total_users": 10234,
    "active_users": 5123,
    "total_communities": 342,
    "total_posts": 8934,
    "total_events": 234,
    "pending_reports": 12
  }
}
```

### Get Users (Admin)

```
GET /admin/users?page=1&limit=20&status=active
Authorization: Bearer <access_token>
Role: admin

Response (200 OK):
{
  "success": true,
  "data": [
    { /* User objects */ }
  ],
  "pagination": { /* ... */ }
}
```

### Suspend User

```
POST /admin/users/:user_id/suspend
Authorization: Bearer <access_token>
Role: admin
Content-Type: application/json

Request Body:
{
  "reason": "Violation of community guidelines",
  "duration_days": 7
}

Response (200 OK):
{
  "success": true,
  "message": "User suspended for 7 days"
}
```

### Get Reported Content

```
GET /admin/reports?page=1&limit=20&status=pending
Authorization: Bearer <access_token>
Role: admin

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "content_type": "post",
      "content_id": "uuid",
      "reason": "spam",
      "reported_by": "uuid",
      "status": "pending",
      "created_at": "2026-03-21T10:30:00Z"
    }
  ],
  "pagination": { /* ... */ }
}
```

### Remove Content

```
POST /admin/reports/:report_id/resolve
Authorization: Bearer <access_token>
Role: admin
Content-Type: application/json

Request Body:
{
  "action": "remove",
  "reason": "Violates community guidelines"
}

Response (200 OK):
{
  "success": true,
  "message": "Content removed successfully"
}
```

---

## ERROR HANDLING

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| INVALID_REQUEST | 400 | Invalid request format |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists |
| VALIDATION_ERROR | 422 | Validation failed |
| RATE_LIMITED | 429 | Rate limit exceeded |
| SERVER_ERROR | 500 | Internal server error |

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "message": "Must be a valid email address"
    }
  },
  "timestamp": "2026-03-21T10:30:00Z"
}
```

---

## RATE LIMITING

### Rate Limits

- **Unauthenticated:** 100 requests per hour per IP
- **Authenticated:** 1000 requests per hour per user
- **Admin:** 5000 requests per hour

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1645267200
```

---

## PAGINATION

### Query Parameters

- `page`: Page number (1-indexed, default: 1)
- `limit`: Items per page (default: 20, max: 100)

### Response Format

```json
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1250,
    "pages": 63,
    "has_next": true,
    "has_prev": false
  }
}
```

---

**Document Version:** 1.0  
**Created:** March 2026  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Backend & Frontend Development Teams
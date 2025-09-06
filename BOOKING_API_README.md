# Booking API with Calendly Integration

This document describes the booking API implementation with Calendly integration for session booking.

## Environment Variables Required

Add these environment variables to your `.env` file:

```env
# Calendly Configuration
CALENDLY_API_TOKEN=your_calendly_personal_access_token_here
CALENDLY_EVENT_TYPE_UUID=your_calendly_event_type_uuid_here
CALENDLY_WEBHOOK_SECRET=your_calendly_webhook_secret_here
```

## How to Get Calendly Credentials

1. **Personal Access Token**:

   - Go to [Calendly Integrations](https://calendly.com/integrations/api_webhooks)
   - Create a Personal Access Token
   - Copy the token and add it to `CALENDLY_API_TOKEN`

2. **Event Type UUID**:

   - Go to your Calendly account settings
   - Navigate to Event Types
   - Copy the UUID of the event type you want to use
   - Add it to `CALENDLY_EVENT_TYPE_UUID`

3. **Webhook Secret**:
   - In Calendly webhook settings, create a webhook
   - Set the webhook URL to: `https://yourdomain.com/api/v1/public/calendly/webhook`
   - Copy the webhook secret and add it to `CALENDLY_WEBHOOK_SECRET`

## API Endpoints

### Public Booking APIs

#### 1. Create Booking Request

```
POST /api/v1/public/booking
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Corp",
  "companyWebsite": "https://acme.com",
  "position": "CEO",
  "isDecisionMaker": true,
  "email": "john@acme.com",
  "businessPhone": {
    "code": "+1",
    "number": "5551234567"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking request created successfully! Please use the provided link to schedule your meeting.",
  "results": {
    "booking": {
      "_id": "booking_id",
      "firstName": "John",
      "lastName": "Doe",
      "calendlyLink": "https://calendly.com/your-username/meeting/unique-link",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "calendlyLink": "https://calendly.com/your-username/meeting/unique-link"
  }
}
```

#### 2. Get Booking Details

```
GET /api/v1/public/booking/:id
```

#### 3. Update Booking Status (for webhooks)

```
PATCH /api/v1/public/booking/:id/status
```

**Request Body:**

```json
{
  "status": "scheduled",
  "eventData": {
    "eventUri": "https://api.calendly.com/scheduled_events/event_id",
    "inviteeUri": "https://api.calendly.com/scheduled_events/event_id/invitees/invitee_id",
    "scheduledAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### Admin Booking APIs

#### 1. Get All Bookings

```
GET /api/v1/admin/booking
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `term`: Search term
- `status`: Filter by status (pending, scheduled, completed, cancelled)
- `isRead`: Filter by read status (true/false)
- `sortBy`: Sort field
- `sortDirection`: Sort direction (asc/desc)

#### 2. Get Single Booking

```
GET /api/v1/admin/booking/:id
```

#### 3. Update Booking

```
PUT /api/v1/admin/booking
```

**Request Body:**

```json
{
  "_id": "booking_id",
  "status": "completed",
  "isRead": true,
  "meetingNotes": "Great meeting, follow up scheduled"
}
```

#### 4. Delete Bookings

```
DELETE /api/v1/admin/booking/:ids
```

(Comma-separated IDs)

#### 5. Cancel Booking

```
POST /api/v1/admin/booking/:id/cancel
```

**Request Body:**

```json
{
  "reason": "Client requested cancellation"
}
```

#### 6. Get Calendly Event Details

```
GET /api/v1/admin/booking/:id/calendly/event
```

#### 7. Get Calendly Invitee Details

```
GET /api/v1/admin/booking/:id/calendly/invitee
```

#### 8. Get Calendly Account Info

```
GET /api/v1/admin/booking/calendly/info
```

### Webhook Endpoint

#### Calendly Webhook

```
POST /api/v1/public/calendly/webhook
```

This endpoint receives webhooks from Calendly for real-time updates:

- `invitee.created`: When someone books a meeting
- `invitee.canceled`: When a meeting is canceled
- `invitee.no_show`: When someone doesn't show up

## Booking Model Schema

```javascript
{
  firstName: String (required),
  lastName: String (required),
  companyName: String (required),
  companyWebsite: String (required),
  position: String (required),
  isDecisionMaker: Boolean (required),
  email: String (required),
  businessPhone: {
    code: String,
    number: String
  },
  calendlyLink: String (required),
  calendlyEventUri: String,
  calendlyInviteeUri: String,
  status: String (enum: ['pending', 'scheduled', 'completed', 'cancelled']),
  scheduledAt: Date,
  meetingNotes: String,
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Features

1. **Automatic Calendly Link Generation**: Each booking request automatically generates a unique Calendly scheduling link
2. **Real-time Status Updates**: Webhooks keep booking status synchronized with Calendly
3. **Admin Management**: Full CRUD operations for managing bookings
4. **Search and Filtering**: Advanced search and filtering capabilities for admin
5. **Calendly Integration**: Direct integration with Calendly API for event management
6. **Error Handling**: Graceful fallback when Calendly is unavailable

## Error Handling

The API includes comprehensive error handling:

- Calendly API failures fall back to a default link
- Webhook signature verification for security
- Proper HTTP status codes and error messages
- Logging for debugging and monitoring

## Security

- Webhook signature verification using HMAC-SHA256
- Admin authentication required for management endpoints
- Input validation and sanitization
- Rate limiting (if configured)

## Testing

You can test the APIs using the provided Postman collection or any HTTP client. Make sure to:

1. Set up the environment variables
2. Configure Calendly webhooks
3. Test the booking flow end-to-end
4. Verify webhook processing

## Troubleshooting

1. **Calendly API errors**: Check your API token and event type UUID
2. **Webhook not working**: Verify webhook URL and secret
3. **Booking not updating**: Check webhook processing logs
4. **Authentication issues**: Verify admin token and permissions

// Simple test script to verify booking API endpoints
const axios = require("axios");

const BASE_URL = "http://localhost:3000/api/v1";

// Test data
const testBooking = {
  firstName: "John",
  lastName: "Doe",
  companyName: "Acme Corp",
  companyWebsite: "https://acme.com",
  position: "CEO",
  isDecisionMaker: true,
  email: "john@acme.com",
  businessPhone: {
    code: "+1",
    number: "5551234567",
  },
};

async function testBookingAPI() {
  console.log("🧪 Testing Booking API...\n");

  try {
    // Test 1: Create a booking
    console.log("1. Testing booking creation...");
    const createResponse = await axios.post(
      `${BASE_URL}/public/booking`,
      testBooking
    );
    console.log("✅ Booking created successfully");
    console.log("Response:", createResponse.data);

    const bookingId = createResponse.data.results.booking._id;
    console.log("Booking ID:", bookingId);
    console.log("Calendly Link:", createResponse.data.results.calendlyLink);
    console.log("");

    // Test 2: Get booking details
    console.log("2. Testing booking retrieval...");
    const getResponse = await axios.get(
      `${BASE_URL}/public/booking/${bookingId}`
    );
    console.log("✅ Booking retrieved successfully");
    console.log("Response:", getResponse.data);
    console.log("");

    // Test 3: Update booking status
    console.log("3. Testing booking status update...");
    const updateResponse = await axios.patch(
      `${BASE_URL}/public/booking/${bookingId}/status`,
      {
        status: "scheduled",
        eventData: {
          eventUri: "https://api.calendly.com/scheduled_events/test123",
          inviteeUri:
            "https://api.calendly.com/scheduled_events/test123/invitees/invitee123",
          scheduledAt: new Date().toISOString(),
        },
      }
    );
    console.log("✅ Booking status updated successfully");
    console.log("Response:", updateResponse.data);
    console.log("");

    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.response?.status === 404) {
      console.log("💡 Make sure the server is running on port 3000");
    }
  }
}

// Test admin endpoints (requires authentication)
async function testAdminAPI() {
  console.log("\n🔐 Testing Admin API (requires authentication)...\n");

  try {
    // Note: This would require admin authentication
    console.log("Admin endpoints available:");
    console.log("- GET /api/v1/admin/booking (list all bookings)");
    console.log("- GET /api/v1/admin/booking/:id (get single booking)");
    console.log("- PUT /api/v1/admin/booking (update booking)");
    console.log("- DELETE /api/v1/admin/booking/:ids (delete bookings)");
    console.log("- POST /api/v1/admin/booking/:id/cancel (cancel booking)");
    console.log(
      "- GET /api/v1/admin/booking/:id/calendly/event (get Calendly event)"
    );
    console.log(
      "- GET /api/v1/admin/booking/:id/calendly/invitee (get Calendly invitee)"
    );
    console.log(
      "- GET /api/v1/admin/booking/calendly/info (get Calendly account info)"
    );
  } catch (error) {
    console.error("❌ Admin test failed:", error.message);
  }
}

// Test webhook endpoint
async function testWebhookAPI() {
  console.log("\n🔗 Testing Webhook API...\n");

  try {
    console.log("Webhook endpoint available:");
    console.log("- POST /api/v1/public/calendly/webhook (Calendly webhook)");
    console.log("");
    console.log("💡 To test webhooks:");
    console.log("1. Set up webhook in Calendly dashboard");
    console.log("2. Configure CALENDLY_WEBHOOK_SECRET in environment");
    console.log(
      "3. Webhook will receive events: invitee.created, invitee.canceled, invitee.no_show"
    );
  } catch (error) {
    console.error("❌ Webhook test failed:", error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log("🚀 Starting Booking API Tests\n");
  console.log("Make sure your server is running with: npm run dev\n");

  await testBookingAPI();
  await testAdminAPI();
  await testWebhookAPI();

  console.log("\n📋 Environment Variables Required:");
  console.log("CALENDLY_API_TOKEN=your_calendly_token");
  console.log("CALENDLY_EVENT_TYPE_UUID=your_event_type_uuid");
  console.log("CALENDLY_WEBHOOK_SECRET=your_webhook_secret");
  console.log("\n📖 See BOOKING_API_README.md for detailed documentation");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { testBookingAPI, testAdminAPI, testWebhookAPI };

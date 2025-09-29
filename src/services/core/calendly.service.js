const axios = require("axios");

class CalendlyService {
  constructor() {
    this.baseURL = "https://api.calendly.com";
    this.apiToken = process.env.CALENDLY_API_TOKEN;
    this.eventTypeUuid = process.env.CALENDLY_EVENT_TYPE_UUID;

    // if (!this.apiToken) {
    //   console.warn("CALENDLY_API_TOKEN not found in environment variables");
    // }

    // if (!this.eventTypeUuid) {
    //   console.warn(
    //     "CALENDLY_EVENT_TYPE_UUID not found in environment variables"
    //   );
    // }
  }

  /**
   * Create a single-use scheduling link
   * @param {Object} options - Options for creating the scheduling link
   * @returns {Promise<Object>} - The scheduling link response
   */
  async createSchedulingLink(options = {}) {
    try {
      if (!this.apiToken || !this.eventTypeUuid) {
        throw new Error("Calendly API token or event type UUID not configured");
      }

      const payload = {
        max_event_count: options.maxEventCount || 1,
        owner: `https://api.calendly.com/event_types/${this.eventTypeUuid}`,
        ...(options.ownerType && { owner_type: options.ownerType }),
        ...(options.owner && { owner: options.owner }),
      };

      const response = await axios.post(
        `${this.baseURL}/scheduling_links`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating Calendly scheduling link:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to create Calendly scheduling link: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  /**
   * Get event details by URI
   * @param {string} eventUri - The event URI from Calendly
   * @returns {Promise<Object>} - The event details
   */
  async getEventDetails(eventUri) {
    try {
      if (!this.apiToken) {
        throw new Error("Calendly API token not configured");
      }

      const response = await axios.get(
        `${this.baseURL}/scheduled_events/${eventUri.split("/").pop()}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Calendly event details:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Calendly event details: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  /**
   * Get invitee details by URI
   * @param {string} inviteeUri - The invitee URI from Calendly
   * @returns {Promise<Object>} - The invitee details
   */
  async getInviteeDetails(inviteeUri) {
    try {
      if (!this.apiToken) {
        throw new Error("Calendly API token not configured");
      }

      const response = await axios.get(
        `${this.baseURL}/scheduled_events/${inviteeUri
          .split("/")
          .pop()}/invitees`,
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Calendly invitee details:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Calendly invitee details: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  /**
   * Cancel a scheduled event
   * @param {string} eventUri - The event URI from Calendly
   * @param {string} reason - Reason for cancellation
   * @returns {Promise<Object>} - The cancellation response
   */
  async cancelEvent(eventUri, reason = "Cancelled by user") {
    try {
      if (!this.apiToken) {
        throw new Error("Calendly API token not configured");
      }

      const response = await axios.post(
        `${this.baseURL}/scheduled_events/${eventUri
          .split("/")
          .pop()}/cancellation`,
        {
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error cancelling Calendly event:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to cancel Calendly event: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  /**
   * Get current user information
   * @returns {Promise<Object>} - The user information
   */
  async getCurrentUser() {
    try {
      if (!this.apiToken) {
        throw new Error("Calendly API token not configured");
      }

      const response = await axios.get(`${this.baseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Calendly user info:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Calendly user info: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }

  /**
   * Get event types for the current user
   * @returns {Promise<Object>} - The event types
   */
  async getEventTypes() {
    try {
      if (!this.apiToken) {
        throw new Error("Calendly API token not configured");
      }

      const response = await axios.get(`${this.baseURL}/event_types`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching Calendly event types:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to fetch Calendly event types: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
}

module.exports = CalendlyService;

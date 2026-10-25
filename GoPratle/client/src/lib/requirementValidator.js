export const validateRequirementPayload = (data) => {
  const errors = [];

  if (!data.eventBasics) {
    errors.push('eventBasics object is required');
  } else {
    const { eventName, eventType, startDate, endDate, isDateRange, location } = data.eventBasics;

    if (!eventName || typeof eventName !== 'string' || eventName.trim().length < 3) {
      errors.push('Event name must be at least 3 characters long');
    }

    if (!eventType || typeof eventType !== 'string' || eventType.trim().length === 0) {
      errors.push('Event type is required');
    }

    if (!startDate || isNaN(Date.parse(startDate))) {
      errors.push('A valid start date is required');
    }

    if (isDateRange) {
      if (!endDate || isNaN(Date.parse(endDate))) {
        errors.push('A valid end date is required when date range is selected');
      } else if (new Date(endDate) < new Date(startDate)) {
        errors.push('End date cannot be earlier than start date');
      }
    }

    if (!location || !location.city || typeof location.city !== 'string' || location.city.trim().length === 0) {
      errors.push('Location city is required');
    }
  }

  const validCategories = ['planner', 'performer', 'crew'];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  } else {
    if (data.category === 'planner') {
      const p = data.plannerDetails || {};
      if (!p.planningScope) {
        errors.push('Planning scope is required for Event Planner');
      }
      if (p.guestCount !== undefined && (isNaN(p.guestCount) || Number(p.guestCount) < 1)) {
        errors.push('Guest count must be at least 1 for Event Planner');
      }
    } else if (data.category === 'performer') {
      const perf = data.performerDetails || {};
      if (!perf.performerRole) {
        errors.push('Performer role is required for Performer requirement');
      }
      if (!Array.isArray(perf.genres) || perf.genres.length === 0) {
        errors.push('At least one genre/style must be selected for Performer requirement');
      }
      if (perf.durationMinutes !== undefined && (isNaN(perf.durationMinutes) || Number(perf.durationMinutes) < 15)) {
        errors.push('Performance duration must be at least 15 minutes');
      }
    } else if (data.category === 'crew') {
      const c = data.crewDetails || {};
      if (!c.crewDiscipline) {
        errors.push('Crew discipline/role is required for Crew requirement');
      }
      if (c.headcount !== undefined && (isNaN(c.headcount) || Number(c.headcount) < 1)) {
        errors.push('Headcount must be at least 1 for Crew requirement');
      }
      if (c.shiftHours !== undefined && (isNaN(c.shiftHours) || Number(c.shiftHours) < 1)) {
        errors.push('Shift duration must be at least 1 hour');
      }
    }
  }

  if (!data.contactPerson) {
    errors.push('contactPerson details are required');
  } else {
    const { name, email, phone } = data.contactPerson;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Contact person name is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('A valid contact email is required');
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      errors.push('A valid contact phone number is required (min 8 digits)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

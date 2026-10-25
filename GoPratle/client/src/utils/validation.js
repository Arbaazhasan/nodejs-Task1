export const validateStep = (stepNumber, formData) => {
  const errors = {};
  const basics = formData.eventBasics || {};
  const location = basics.location || {};

  if (stepNumber === 1) {
    if (!basics.eventName || basics.eventName.trim().length < 3) {
      errors.eventName = 'Event name must be at least 3 characters';
    }
    if (!basics.eventType) {
      errors.eventType = 'Please select an event type';
    }
    if (!basics.startDate) {
      errors.startDate = 'Please specify an event start date';
    }
    if (basics.isDateRange) {
      if (!basics.endDate) {
        errors.endDate = 'End date is required for date ranges';
      } else if (new Date(basics.endDate) < new Date(basics.startDate)) {
        errors.endDate = 'End date cannot be earlier than start date';
      }
    }
    if (!location.city || location.city.trim().length === 0) {
      errors.city = 'Event city is required';
    }
    if (!formData.category) {
      errors.category = 'Please select a category (Planner, Performer, or Crew)';
    }
  }

  if (stepNumber === 2) {
    if (formData.category === 'planner') {
      const p = formData.plannerDetails || {};
      if (!p.planningScope) {
        errors.planningScope = 'Please select a planning scope';
      }
      if (!p.guestCount || Number(p.guestCount) < 1) {
        errors.guestCount = 'Guest count must be at least 1';
      }
    } else if (formData.category === 'performer') {
      const perf = formData.performerDetails || {};
      if (!perf.performerRole) {
        errors.performerRole = 'Please select a performer role';
      }
      if (!perf.genres || perf.genres.length === 0) {
        errors.genres = 'Select at least one genre / performance style';
      }
      if (!perf.durationMinutes || Number(perf.durationMinutes) < 15) {
        errors.durationMinutes = 'Duration must be at least 15 minutes';
      }
    } else if (formData.category === 'crew') {
      const c = formData.crewDetails || {};
      if (!c.crewDiscipline) {
        errors.crewDiscipline = 'Please select a crew discipline';
      }
      if (!c.headcount || Number(c.headcount) < 1) {
        errors.headcount = 'Headcount must be at least 1 member';
      }
      if (!c.shiftHours || Number(c.shiftHours) < 1) {
        errors.shiftHours = 'Shift duration must be at least 1 hour';
      }
    }
  }

  if (stepNumber === 4) {
    const contact = formData.contactPerson || {};
    if (!contact.name || contact.name.trim().length === 0) {
      errors.contactName = 'Contact person name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contact.email || !emailRegex.test(contact.email)) {
      errors.contactEmail = 'Please provide a valid email address';
    }
    if (!contact.phone || contact.phone.trim().length < 8) {
      errors.contactPhone = 'Please enter a valid phone number (min 8 digits)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

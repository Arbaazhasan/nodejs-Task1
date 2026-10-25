import mongoose from 'mongoose';

// Category-specific subdocument schemas
const plannerDetailsSchema = new mongoose.Schema(
  {
    planningScope: {
      type: String,
      enum: ['Full Planning', 'Partial Planning', 'Day-of Coordination', 'Decor & Styling Only'],
    },
    guestCount: {
      type: Number,
      min: 1,
    },
    themePreference: {
      type: String,
      trim: true,
    },
    budget: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
    },
    servicesNeeded: [{ type: String }],
    plannerTier: {
      type: String,
      enum: ['Emerging / Budget Friendly', 'Experienced Mid-Tier', 'Luxury & Celebrity Specialist'],
    },
    preferredLanguages: [{ type: String }],
    criticalMilestones: { type: String, trim: true },
    moodboardUrl: { type: String, trim: true },
    specialNotes: { type: String, trim: true },
  },
  { _id: false }
);

const performerDetailsSchema = new mongoose.Schema(
  {
    performerRole: {
      type: String,
      enum: [
        'Live Band',
        'Solo Singer / Acoustic',
        'DJ',
        'Stand-up Comedian',
        'Anchor / MC',
        'Dance Troupe',
        'Magician / Illusionist',
        'Celebrity Artist',
      ],
    },
    genres: [{ type: String }],
    durationMinutes: { type: Number, min: 15 },
    audienceVibe: {
      type: String,
      enum: ['High Energy / Party', 'Elegant & Ambient', 'Interactive & Humorous', 'Family-Friendly / Festive'],
    },
    soundEquipmentProvided: { type: Boolean, default: false },
    requiredInstruments: [{ type: String }],
    customSongRequestsAllowed: { type: Boolean, default: true },
    budget: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
    },
    hospitalityProvided: [{ type: String }],
    recordingPermission: { type: Boolean, default: true },
    specialNotes: { type: String, trim: true },
  },
  { _id: false }
);

const crewDetailsSchema = new mongoose.Schema(
  {
    crewDiscipline: {
      type: String,
      enum: [
        'Audio / Sound Engineer',
        'Lighting Technician',
        'Videographer / Camera Crew',
        'Photographer',
        'Stage Hand / Rigger',
        'Security / Bouncers',
        'Hospitality & Usher',
      ],
    },
    headcount: { type: Number, min: 1, default: 1 },
    callTime: { type: String, trim: true },
    shiftHours: { type: Number, min: 1 },
    isOvernight: { type: Boolean, default: false },
    dressCode: {
      type: String,
      enum: ['All Black Production', 'Formal / Business Attire', 'Casual / Branded Tee', 'Traditional'],
      default: 'All Black Production',
    },
    skillLevel: {
      type: String,
      enum: ['Entry Level / Assistant', 'Mid-Level Specialist', 'Senior Lead / Director'],
      default: 'Mid-Level Specialist',
    },
    equipmentOwnership: {
      type: String,
      enum: ['Crew Must Bring Own Equipment', 'Venue/Organizer Provides Equipment', 'Hybrid'],
      default: 'Venue/Organizer Provides Equipment',
    },
    rateType: {
      type: String,
      enum: ['Per Day', 'Per Shift', 'Hourly', 'Fixed Contract'],
      default: 'Per Day',
    },
    rateAmount: { type: Number, default: 0 },
    safetyProvisions: [{ type: String }],
    mealsProvided: { type: Boolean, default: true },
    specialNotes: { type: String, trim: true },
  },
  { _id: false }
);

const requirementSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['Open', 'Under Review', 'Fulfilled', 'Closed'],
      default: 'Open',
      index: true,
    },
    urgencyLevel: {
      type: String,
      enum: ['Normal', 'Urgent (Within 48h)', 'Immediate (Same Day)'],
      default: 'Normal',
    },

    // A. Step 1 - Event Basics
    eventBasics: {
      eventName: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true,
      },
      eventType: {
        type: String,
        required: [true, 'Event type is required'],
        trim: true,
      },
      isDateRange: {
        type: Boolean,
        default: false,
      },
      startDate: {
        type: Date,
        required: [true, 'Start date is required'],
      },
      endDate: {
        type: Date,
      },
      location: {
        city: {
          type: String,
          required: [true, 'City is required'],
          trim: true,
        },
        state: {
          type: String,
          trim: true,
        },
        address: {
          type: String,
          trim: true,
        },
        pincode: {
          type: String,
          trim: true,
        },
      },
      venue: {
        name: {
          type: String,
          trim: true,
          default: '',
        },
        venueType: {
          type: String,
          enum: ['Indoor', 'Outdoor', 'Hybrid', 'Not Decided Yet'],
          default: 'Not Decided Yet',
        },
      },
    },

    // Category Selector
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['planner', 'performer', 'crew'],
      index: true,
    },

    // B. Step 2 & 3 - Category-Specific Fields (strictly present only for chosen category)
    plannerDetails: {
      type: plannerDetailsSchema,
      default: undefined,
    },
    performerDetails: {
      type: performerDetailsSchema,
      default: undefined,
    },
    crewDetails: {
      type: crewDetailsSchema,
      default: undefined,
    },

    // C. Step 4 - Poster/Contact Details
    contactPerson: {
      name: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true,
      },
      organization: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Helpful indexes for filtering & sorting
requirementSchema.index({ category: 1, createdAt: -1 });
requirementSchema.index({ status: 1, createdAt: -1 });
requirementSchema.index({ 'eventBasics.location.city': 1 });

const Requirement = mongoose.model('Requirement', requirementSchema);

export default Requirement;

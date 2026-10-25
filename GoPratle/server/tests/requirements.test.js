import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js';
import Requirement from '../src/models/Requirement.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Requirement.deleteMany({});
});

describe('Requirements API', () => {
  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.database.status).toBe('Connected');
    });
  });

  describe('POST /api/requirements', () => {
    it('should create an Event Planner requirement successfully', async () => {
      const payload = {
        category: 'planner',
        urgencyLevel: 'Normal',
        eventBasics: {
          eventName: 'Royal Heritage Wedding Gala',
          eventType: 'Wedding',
          isDateRange: true,
          startDate: '2026-11-20',
          endDate: '2026-11-22',
          location: {
            city: 'Udaipur',
            state: 'Rajasthan',
            address: 'City Palace Complex',
            pincode: '313001',
          },
          venue: {
            name: 'The Leela Palace Ballroom',
            venueType: 'Hybrid',
          },
        },
        plannerDetails: {
          planningScope: 'Full Planning',
          guestCount: 350,
          themePreference: 'Royal Rajputana with Modern Minimalist Florals',
          budget: {
            min: 500000,
            max: 1200000,
            currency: 'INR',
          },
          servicesNeeded: ['Vendor Management', 'Venue Sourcing', 'Catering Coordination', 'Guest Hospitality'],
          plannerTier: 'Luxury & Celebrity Specialist',
          preferredLanguages: ['English', 'Hindi'],
          criticalMilestones: 'Vendor lock-in 60 days before event',
          specialNotes: 'Require dedicated VIP hospitality desk',
        },
        contactPerson: {
          name: 'Vikramaditya Rathore',
          organization: 'Rathore Royal Events',
          email: 'vikram@rathoreevents.in',
          phone: '+919876543210',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^GP-PLN-2026-\d{5}$/);
      expect(res.body.data.category).toBe('planner');
      expect(res.body.data.plannerDetails.guestCount).toBe(350);
      expect(res.body.data.performerDetails).toBeUndefined();
    });

    it('should create a Performer requirement successfully', async () => {
      const payload = {
        category: 'performer',
        eventBasics: {
          eventName: 'GoPratle Annual Tech Summit 2026',
          eventType: 'Corporate',
          isDateRange: false,
          startDate: '2026-12-15',
          location: {
            city: 'Bengaluru',
            state: 'Karnataka',
          },
        },
        performerDetails: {
          performerRole: 'Live Band',
          genres: ['Bollywood', 'Fusion', 'Rock'],
          durationMinutes: 90,
          audienceVibe: 'High Energy / Party',
          soundEquipmentProvided: true,
          budget: {
            min: 150000,
            max: 300000,
            currency: 'INR',
          },
          hospitalityProvided: ['Green Room', 'Meals & Refreshments', 'Local Transit'],
          recordingPermission: true,
        },
        contactPerson: {
          name: 'Ananya Sharma',
          email: 'ananya@gopratle.com',
          phone: '+919123456789',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.referenceId).toMatch(/^GP-PRF-2026-\d{5}$/);
      expect(res.body.data.category).toBe('performer');
      expect(res.body.data.performerDetails.performerRole).toBe('Live Band');
    });

    it('should create a Crew requirement successfully', async () => {
      const payload = {
        category: 'crew',
        eventBasics: {
          eventName: 'Indie Fusion Festival Mumbai',
          eventType: 'Concert / Music Festival',
          isDateRange: false,
          startDate: '2026-12-30',
          location: {
            city: 'Mumbai',
            state: 'Maharashtra',
          },
        },
        crewDetails: {
          crewDiscipline: 'Audio / Sound Engineer',
          headcount: 4,
          callTime: '07:30 AM',
          shiftHours: 12,
          isOvernight: false,
          dressCode: 'All Black Production',
          skillLevel: 'Senior Lead / Director',
          equipmentOwnership: 'Venue/Organizer Provides Equipment',
          rateType: 'Per Day',
          rateAmount: 12000,
          safetyProvisions: ['Safety Briefing Required'],
          mealsProvided: true,
        },
        contactPerson: {
          name: 'Kabir Sen',
          email: 'kabir@indiefest.com',
          phone: '+919988776655',
        },
      };

      const res = await request(app).post('/api/requirements').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.referenceId).toMatch(/^GP-CRW-2026-\d{5}$/);
      expect(res.body.data.category).toBe('crew');
      expect(res.body.data.crewDetails.headcount).toBe(4);
    });

    it('should reject invalid payload with missing event basics and invalid email', async () => {
      const invalidPayload = {
        category: 'planner',
        eventBasics: {
          eventName: 'Hi', // too short (< 3 chars)
        },
        contactPerson: {
          name: '',
          email: 'not-an-email',
          phone: '123',
        },
      };

      const res = await request(app).post('/api/requirements').send(invalidPayload);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/requirements and filtering', () => {
    beforeEach(async () => {
      await Requirement.create([
        {
          referenceId: 'GP-PLN-2026-11111',
          category: 'planner',
          eventBasics: {
            eventName: 'Delhi Winter Carnival',
            eventType: 'Exhibition / Trade Show',
            startDate: new Date('2026-12-01'),
            location: { city: 'New Delhi' },
          },
          plannerDetails: { planningScope: 'Full Planning', guestCount: 500 },
          contactPerson: { name: 'Pooja', email: 'pooja@delhievents.com', phone: '+919876543211' },
        },
        {
          referenceId: 'GP-PRF-2026-22222',
          category: 'performer',
          eventBasics: {
            eventName: 'Bangalore Acoustic Evening',
            eventType: 'Concert / Music Festival',
            startDate: new Date('2026-12-05'),
            location: { city: 'Bengaluru' },
          },
          performerDetails: { performerRole: 'Solo Singer / Acoustic', genres: ['Indie', 'Acoustic'] },
          contactPerson: { name: 'Rohan', email: 'rohan@acoustic.com', phone: '+919876543212' },
        },
      ]);
    });

    it('should filter by category=planner', async () => {
      const res = await request(app).get('/api/requirements?category=planner');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].category).toBe('planner');
      expect(res.body.data[0].referenceId).toBe('GP-PLN-2026-11111');
    });

    it('should filter by search keyword', async () => {
      const res = await request(app).get('/api/requirements?search=Acoustic');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].referenceId).toBe('GP-PRF-2026-22222');
    });

    it('should return metrics at /api/requirements/stats', async () => {
      const res = await request(app).get('/api/requirements/stats');
      expect(res.status).toBe(200);
      expect(res.body.data.total).toBe(2);
      expect(res.body.data.byCategory.planner).toBe(1);
      expect(res.body.data.byCategory.performer).toBe(1);
      expect(res.body.data.byCategory.crew).toBe(0);
    });
  });
});

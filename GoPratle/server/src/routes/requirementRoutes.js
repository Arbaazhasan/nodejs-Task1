import express from 'express';
import {
  createRequirement,
  getRequirements,
  getRequirementById,
  getRequirementStats,
  updateRequirementStatus,
  deleteRequirement,
} from '../controllers/requirementController.js';

const router = express.Router();

router.post('/', createRequirement);
router.get('/', getRequirements);
router.get('/stats', getRequirementStats);
router.get('/:id', getRequirementById);
router.patch('/:id/status', updateRequirementStatus);
router.delete('/:id', deleteRequirement);

export default router;

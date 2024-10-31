import { Router } from 'express'; // Import the express router
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes); // Use the apiRoutes
router.use('/', htmlRoutes); // Use the htmlRoutes

export default router;

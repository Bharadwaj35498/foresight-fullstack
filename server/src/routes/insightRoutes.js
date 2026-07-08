const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/insightController');
const { requireAuth } = require('../middleware/auth');

// All insight routes require a valid JWT (issued via /api/auth/login).
router.use(requireAuth);

router.get('/', ctrl.listInsights);
router.get('/filters', ctrl.getFilterOptions);
router.get('/stats', ctrl.getStats);
router.get('/ticker', ctrl.ticker);

router.get('/aggregations/by-country', ctrl.byCountry);
router.get('/aggregations/by-sector', ctrl.bySector);
router.get('/aggregations/treemap', ctrl.treemap);
router.get('/aggregations/heatmap', ctrl.heatmap);
router.get('/aggregations/radar', ctrl.radar);
router.get('/aggregations/sankey', ctrl.sankey);
router.get('/aggregations/sunburst', ctrl.sunburst);
router.get('/aggregations/timeline', ctrl.timeline);
router.get('/aggregations/bubble', ctrl.bubble);

module.exports = router;

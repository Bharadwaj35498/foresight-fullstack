const Insight = require('../models/Insight');
const { buildFilterQuery } = require('../utils/buildFilterQuery');

/* ------------------------------------------------------------------ */
/*  GET /api/insights  — paginated, filtered, sorted list              */
/* ------------------------------------------------------------------ */
async function listInsights(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const sortKey = req.query.sortKey || 'intensity';
    const sortDir = req.query.sortDir === 'asc' ? 1 : -1;
    const allowedSortKeys = [
      'intensity', 'likelihood', 'relevance', 'country', 'region',
      'sector', 'topic', 'pestle', 'end_year', 'source', 'createdAt',
    ];
    const sort = { [allowedSortKeys.includes(sortKey) ? sortKey : 'intensity']: sortDir };

    const [rows, total] = await Promise.all([
      Insight.find(match).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Insight.countDocuments(match),
    ]);

    res.json({
      data: rows,
      pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/filters  — distinct values to populate dropdowns */
/* ------------------------------------------------------------------ */
async function getFilterOptions(req, res, next) {
  try {
    const fields = ['end_year', 'topic', 'sector', 'region', 'country', 'pestle', 'source'];
    const entries = await Promise.all(
      fields.map(async (f) => {
        const values = await Insight.distinct(f, { [f]: { $nin: ['', null] } });
        return [f, values.sort((a, b) => String(a).localeCompare(String(b)))];
      })
    );
    const result = Object.fromEntries(entries);
    result.swot = ['Opportunity', 'Strength', 'Threat', 'Weakness'];
    res.json(result);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/stats  — headline KPIs                           */
/* ------------------------------------------------------------------ */
async function getStats(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const [agg] = await Insight.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' },
          countries: { $addToSet: '$country' },
        },
      },
      {
        $project: {
          _id: 0, total: 1, avgIntensity: 1, avgLikelihood: 1, avgRelevance: 1,
          countryCount: {
            $size: {
              $filter: { input: '$countries', as: 'c', cond: { $and: [{ $ne: ['$$c', ''] }, { $ne: ['$$c', 'Unknown'] }] } },
            },
          },
        },
      },
    ]);
    res.json(agg || { total: 0, avgIntensity: 0, avgLikelihood: 0, avgRelevance: 0, countryCount: 0 });
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/by-country                          */
/*  -> count + avg intensity per country (choropleth + bar chart)      */
/* ------------------------------------------------------------------ */
async function byCountry(req, res, next) {
  try {
    const match = { ...buildFilterQuery(req.query), country: { $nin: ['', 'Unknown'] } };
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: '$country', count: { $sum: 1 }, avgIntensity: { $avg: '$intensity' } } },
      { $project: { _id: 0, country: '$_id', count: 1, avgIntensity: { $round: ['$avgIntensity', 2] } } },
      { $sort: { count: -1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/by-sector — donut chart             */
/* ------------------------------------------------------------------ */
async function bySector(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: '$sector', count: { $sum: 1 } } },
      { $project: { _id: 0, sector: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/treemap — sector -> topic           */
/* ------------------------------------------------------------------ */
async function treemap(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: { sector: '$sector', topic: '$topic' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      {
        $group: {
          _id: '$_id.sector',
          topics: { $push: { name: '$_id.topic', value: '$count' } },
          total: { $sum: '$count' },
        },
      },
      { $project: { _id: 0, sector: '$_id', total: 1, topics: { $slice: ['$topics', 12] } } },
      { $sort: { total: -1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/heatmap — region x sector matrix    */
/* ------------------------------------------------------------------ */
async function heatmap(req, res, next) {
  try {
    const match = { ...buildFilterQuery(req.query), region: { $ne: 'Unknown' }, sector: { $ne: 'Unknown' } };
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: { region: '$region', sector: '$sector' }, count: { $sum: 1 } } },
      { $project: { _id: 0, region: '$_id.region', sector: '$_id.sector', count: 1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/radar — avg intensity per PESTLE    */
/* ------------------------------------------------------------------ */
async function radar(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: '$pestle', avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
      { $project: { _id: 0, pestle: '$_id', avgIntensity: { $round: ['$avgIntensity', 2] }, count: 1 } },
      { $sort: { pestle: 1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/sankey — region -> country -> sector*/
/* ------------------------------------------------------------------ */
async function sankey(req, res, next) {
  try {
    const base = { ...buildFilterQuery(req.query), region: { $ne: 'Unknown' }, country: { $ne: 'Unknown' }, sector: { $ne: 'Unknown' } };

    const topRegionsAgg = await Insight.aggregate([{ $match: base }, { $group: { _id: '$region', c: { $sum: 1 } } }, { $sort: { c: -1 } }, { $limit: 6 }]);
    const topRegions = topRegionsAgg.map((r) => r._id);

    const match2 = { ...base, region: { $in: topRegions } };
    const topCountriesAgg = await Insight.aggregate([{ $match: match2 }, { $group: { _id: '$country', c: { $sum: 1 } } }, { $sort: { c: -1 } }, { $limit: 12 }]);
    const topCountries = topCountriesAgg.map((r) => r._id);

    const match3 = { ...match2, country: { $in: topCountries } };
    const topSectorsAgg = await Insight.aggregate([{ $match: match3 }, { $group: { _id: '$sector', c: { $sum: 1 } } }, { $sort: { c: -1 } }, { $limit: 8 }]);
    const topSectors = topSectorsAgg.map((r) => r._id);

    const match4 = { ...match3, sector: { $in: topSectors } };

    const [regionToCountry, countryToSector] = await Promise.all([
      Insight.aggregate([{ $match: match4 }, { $group: { _id: { source: '$region', target: '$country' }, value: { $sum: 1 } } }]),
      Insight.aggregate([{ $match: match4 }, { $group: { _id: { source: '$country', target: '$sector' }, value: { $sum: 1 } } }]),
    ]);

    const nodes = [
      ...topRegions.map((r) => ({ name: `R: ${r}` })),
      ...topCountries.map((c) => ({ name: `C: ${c}` })),
      ...topSectors.map((s) => ({ name: `S: ${s}` })),
    ];
    const links = [
      ...regionToCountry.map((l) => ({ source: `R: ${l._id.source}`, target: `C: ${l._id.target}`, value: l.value })),
      ...countryToSector.map((l) => ({ source: `C: ${l._id.source}`, target: `S: ${l._id.target}`, value: l.value })),
    ];

    res.json({ nodes, links });
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/sunburst — region->country->topic   */
/* ------------------------------------------------------------------ */
async function sunburst(req, res, next) {
  try {
    const base = { ...buildFilterQuery(req.query), region: { $ne: 'Unknown' } };
    const topRegionsAgg = await Insight.aggregate([{ $match: base }, { $group: { _id: '$region', c: { $sum: 1 } } }, { $sort: { c: -1 } }, { $limit: 6 }]);
    const topRegions = topRegionsAgg.map((r) => r._id);

    const result = [];
    for (const region of topRegions) {
      const countryAgg = await Insight.aggregate([
        { $match: { ...base, region, country: { $ne: 'Unknown' } } },
        { $group: { _id: '$country', c: { $sum: 1 } } },
        { $sort: { c: -1 } },
        { $limit: 5 },
      ]);
      const children = [];
      for (const c of countryAgg) {
        const topicAgg = await Insight.aggregate([
          { $match: { ...base, region, country: c._id } },
          { $group: { _id: '$topic', c: { $sum: 1 } } },
          { $sort: { c: -1 } },
          { $limit: 5 },
        ]);
        children.push({ name: c._id, children: topicAgg.map((t) => ({ name: t._id, value: t.c })) });
      }
      result.push({ name: region, children: children.filter((c) => c.children.length) });
    }
    res.json(result.filter((r) => r.children.length));
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/timeline — reports & avg int./year  */
/* ------------------------------------------------------------------ */
async function timeline(req, res, next) {
  try {
    const match = { ...buildFilterQuery(req.query), derived_year: { $ne: null } };
    const rows = await Insight.aggregate([
      { $match: match },
      { $group: { _id: '$derived_year', count: { $sum: 1 }, avgIntensity: { $avg: '$intensity' } } },
      { $project: { _id: 0, year: '$_id', count: 1, avgIntensity: { $round: ['$avgIntensity', 2] } } },
      { $sort: { year: 1 } },
    ]);
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/aggregations/bubble — likelihood/relevance data  */
/* ------------------------------------------------------------------ */
async function bubble(req, res, next) {
  try {
    const match = buildFilterQuery(req.query);
    const topSectorsAgg = await Insight.aggregate([
      { $match: { ...match, sector: { $ne: 'Unknown' } } },
      { $group: { _id: '$sector', c: { $sum: 1 } } },
      { $sort: { c: -1 } },
      { $limit: 10 },
    ]);
    const topSectors = topSectorsAgg.map((s) => s._id);
    const rows = await Insight.find(
      { ...match, sector: { $in: topSectors } },
      { sector: 1, likelihood: 1, relevance: 1, intensity: 1, title: 1, _id: 0 }
    ).limit(1000).lean();
    res.json(rows);
  } catch (err) { next(err); }
}

/* ------------------------------------------------------------------ */
/*  GET /api/insights/ticker — top signals by intensity for the ticker */
/* ------------------------------------------------------------------ */
async function ticker(req, res, next) {
  try {
    const rows = await Insight.find({ title: { $ne: '' } }, { title: 1, country: 1, region: 1, intensity: 1, _id: 0 })
      .sort({ intensity: -1 }).limit(18).lean();
    res.json(rows);
  } catch (err) { next(err); }
}

module.exports = {
  listInsights, getFilterOptions, getStats, byCountry, bySector, treemap,
  heatmap, radar, sankey, sunburst, timeline, bubble, ticker,
};

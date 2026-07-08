/**
 * Builds a Mongo `find`/aggregation `$match` filter from the dashboard's
 * shared query-string filters. Every insight endpoint accepts the same set
 * of params, so every chart on the frontend stays in sync automatically.
 *
 * Supported query params:
 *   end_year, topic, sector, region, country, pestle, source, swot, search
 */
function buildFilterQuery(query = {}) {
  const match = {};

  if (query.end_year) match.end_year = query.end_year;
  if (query.topic) match.topic = query.topic;
  if (query.sector) match.sector = query.sector;
  if (query.region) match.region = query.region;
  if (query.country) match.country = query.country;
  if (query.pestle) match.pestle = query.pestle;
  if (query.source) match.source = query.source;
  if (query.swot) match.derived_swot = query.swot;

  if (query.search) {
    const re = new RegExp(escapeRegex(query.search), 'i');
    match.$or = [
      { title: re },
      { insight: re },
      { country: re },
      { region: re },
      { sector: re },
      { topic: re },
      { source: re },
    ];
  }

  return match;
}

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { buildFilterQuery };

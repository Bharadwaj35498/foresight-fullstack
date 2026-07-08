const mongoose = require('mongoose');

/**
 * One document = one analyst insight/report row from the source JSON.
 * Field names intentionally mirror the original dataset so the seed
 * script can insert records with minimal transformation.
 */
const InsightSchema = new mongoose.Schema(
  {
    end_year: { type: String, default: '', index: true },
    start_year: { type: String, default: '' },
    intensity: { type: Number, default: 0, index: true },
    likelihood: { type: Number, default: 0, index: true },
    relevance: { type: Number, default: 0, index: true },

    sector: { type: String, default: 'Unknown', index: true, trim: true },
    topic: { type: String, default: 'unspecified', index: true, trim: true },
    region: { type: String, default: 'Unknown', index: true, trim: true },
    country: { type: String, default: 'Unknown', index: true, trim: true },
    city: { type: String, default: '' },
    pestle: { type: String, default: 'Unknown', index: true, trim: true },
    source: { type: String, default: 'Unknown', index: true, trim: true },
    impact: { type: String, default: '' },

    title: { type: String, default: '' },
    insight: { type: String, default: '' },
    url: { type: String, default: '' },

    published: { type: String, default: '' },
    added: { type: String, default: '' },

    // ---- derived / denormalized fields, computed once at seed time ----
    // Extracted 4-digit year used for the timeline chart (prefers end_year,
    // falls back to the year embedded in `published`).
    derived_year: { type: String, default: null, index: true },

    // Demo-only SWOT quadrant. The source dataset has no native SWOT field;
    // this is a simple heuristic derived from intensity × likelihood so the
    // dashboard's SWOT filter has something real to operate on.
    // intensity>=6 & likelihood>=4 -> Opportunity
    // intensity<6  & likelihood>=4 -> Strength
    // intensity>=6 & likelihood<4  -> Threat
    // intensity<6  & likelihood<4  -> Weakness
    derived_swot: {
      type: String,
      enum: ['Opportunity', 'Strength', 'Threat', 'Weakness'],
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index to speed up the most common combined filter shape
InsightSchema.index({ region: 1, sector: 1, country: 1 });

module.exports = mongoose.model('Insight', InsightSchema);

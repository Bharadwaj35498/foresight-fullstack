/**
 * Seeds the `insights` collection from src/data/insights.json.
 *
 * Usage:
 *   npm run seed          (adds/upserts data, keeps existing collection)
 *   npm run seed:fresh    (drops the collection first, then inserts)
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Insight = require('../models/Insight');

function deriveSwot(intensity, likelihood) {
  const hi = intensity >= 6;
  const hl = likelihood >= 4;
  if (hi && hl) return 'Opportunity';
  if (!hi && hl) return 'Strength';
  if (hi && !hl) return 'Threat';
  return 'Weakness';
}

function deriveYear(end_year, published) {
  if (end_year) return String(end_year);
  if (published) {
    const m = String(published).match(/\b(19|20)\d{2}\b/);
    if (m) return m[0];
  }
  return null;
}

async function seed() {
  const dropFirst = process.argv.includes('--drop');
  await connectDB();

  const filePath = path.join(__dirname, '../data/insights.json');
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (dropFirst) {
    console.log('🗑️   Dropping existing insights collection…');
    await Insight.collection.drop().catch(() => {}); // ignore "namespace not found"
  }

  const docs = raw.map((d) => {
    const intensity = Number(d.intensity) || 0;
    const likelihood = Number(d.likelihood) || 0;
    const relevance = Number(d.relevance) || 0;
    return {
      end_year: d.end_year || '',
      start_year: d.start_year || '',
      intensity,
      likelihood,
      relevance,
      sector: d.sector || 'Unknown',
      topic: d.topic || 'unspecified',
      region: d.region || 'Unknown',
      country: d.country || 'Unknown',
      city: d.city || '',
      pestle: d.pestle || 'Unknown',
      source: d.source || 'Unknown',
      impact: d.impact || '',
      title: d.title || '',
      insight: d.insight || '',
      url: d.url || '',
      published: d.published || '',
      added: d.added || '',
      derived_year: deriveYear(d.end_year, d.published),
      derived_swot: deriveSwot(intensity, likelihood),
    };
  });

  console.log(`📥  Inserting ${docs.length} insight records…`);
  const result = await Insight.insertMany(docs, { ordered: false });
  console.log(`✅  Inserted ${result.length} documents into "insights" collection.`);

  const count = await Insight.countDocuments();
  console.log(`📊  Collection now has ${count} total documents.`);

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});

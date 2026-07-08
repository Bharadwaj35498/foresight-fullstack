/**
 * Creates (or updates) the demo admin user used to sign in to the dashboard.
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD from .env.
 *
 * Usage: npm run create-admin
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

async function run() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || 'admin@foresight.io').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || 'ForesightDemo!2026';
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { email },
    { name: 'Foresight Analyst', email, passwordHash, role: 'admin' },
    { upsert: true, new: true }
  );

  console.log('✅  Admin user ready:');
  console.log(`    email:    ${user.email}`);
  console.log(`    password: ${password}  (from ADMIN_PASSWORD in .env)`);

  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌  Failed to create admin user:', err);
  process.exit(1);
});

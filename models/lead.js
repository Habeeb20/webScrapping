import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  category: String,
  country: { type: String, required: true },
  city: { type: String, required: true },
  area: String,
  address: String,
  phone: String,
  whatsappNumber: String,
  whatsappLink: String,
  email: String,
  website: String,
  socialLinks: [String],
  source: String,           // "Google Places", "Website"
  leadQuality: {            // HIGH, MEDIUM, LOW, INCOMPLETE
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW', 'INCOMPLETE']
  },
  scrapedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);
// import mongoose from 'mongoose';

// const leadSchema = new mongoose.Schema({
//   businessName: { type: String, required: true },
//   category: String,
//   country: { type: String, required: true },
//   city: { type: String, required: true },
//   area: String,
//   address: String,
//   phone: String,
//   whatsappNumber: String,
//   linkedIn: String,
//   facebook:String,
//   whatsappLink: String,
//   email: String,
//   website: String,
//   socialLinks: [String],
//   source: String,           // "Google Places", "Website"
//   leadQuality: {            // HIGH, MEDIUM, LOW, INCOMPLETE
//     type: String,
//     enum: ['HIGH', 'MEDIUM', 'LOW', 'INCOMPLETE']
//   },
//   scrapedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Lead', leadSchema);





import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  category: String,
  country: { type: String, required: false, default: 'Cameroon' },   // ← Make sure this exists
  city: { type: String, required: true },
  area: String,
  address: String,
  phone: String,
  whatsappNumber: String,
  whatsappLink: String,
  email: String,
  
  // NEW FIELDS
  facebook: String,      // Full Facebook profile/page URL
  linkedin: String,      // Full LinkedIn company/profile URL
  socialLinks: [String], // Keep this as backup for other socials

  website: String,
  source: String,
  leadQuality: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW', 'INCOMPLETE']
  },
  scrapedAt: { type: Date, default: Date.now }
}, { collection: 'leads' });   // Good practice to avoid collection limit issues

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
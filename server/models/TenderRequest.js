import mongoose from 'mongoose';

const tenderRequestSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    trim: true
  },
  projectLocation: {
    type: String,
    required: true,
    trim: true
  },
  estimatedBudget: {
    type: String,
    required: true
  },
  preferredTimeline: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  }});

const TenderRequest = mongoose.model('TenderRequest', tenderRequestSchema);

export default TenderRequest;
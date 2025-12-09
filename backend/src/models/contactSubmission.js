import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [100, 'City name cannot exceed 100 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new'
  }
}, {
  timestamps: true
});

contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ status: 1 });
contactSubmissionSchema.index({ createdAt: -1 });

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

export default ContactSubmission;

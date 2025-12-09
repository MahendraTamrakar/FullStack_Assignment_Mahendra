import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Client image URL is required'],
    trim: true
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  clientDescription: {
    type: String,
    required: [true, 'Client description is required'],
    trim: true,
    maxlength: [500, 'Client description cannot exceed 500 characters']
  },
  clientDesignation: {
    type: String,
    required: [true, 'Client designation is required'],
    trim: true,
    maxlength: [100, 'Designation cannot exceed 100 characters']
  }
}, {
  timestamps: true
});

clientSchema.index({ clientName: 1 });
clientSchema.index({ createdAt: -1 });

const Client = mongoose.model('Client', clientSchema);

export default Client;

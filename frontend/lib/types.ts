export interface Project {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface Client {
  id: string
  name: string
  description: string
  designation: string
  imageUrl: string
}

// What we SEND in contact form
export interface ContactPayload {
  fullName: string
  email: string
  mobileNumber: string
  city: string
}

// What we SEND when subscribing
export interface NewsletterPayload {
  email: string
}

// What we DISPLAY in admin contacts table
export interface ContactSubmission {
  id: string
  fullName: string
  email: string
  mobile: string      // mapped from backend mobileNumber
  city: string
}

export interface Subscriber {
  id: string
  email: string
}

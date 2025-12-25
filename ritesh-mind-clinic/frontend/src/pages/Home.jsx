import React, { useState, useEffect } from 'react';
import { createAppointment } from '../services/api';

import { Calendar, Clock, Phone, Mail, MapPin, Award, Users, Heart, CheckCircle, Star, Menu, X, ChevronRight, Building2 } from 'lucide-react';

import doctorImage from '../assets/Doc_Profile.jpeg';
import logoImage from '../assets/Logo_Main.jpeg';
console.log(logoImage);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const locations = [
    {
      id: 'L1',
      name: 'Jagdeo Path Clinic',
      address: 'Pillar No:17, Near Uttam Palace, Jagdeo Path, Patna',
      phone: '+91 98765 43210'
    },
    {
      id: 'L2',
      name: 'Danapur Clinic',
      address: 'C-62, New A.G Colony, R.K. Puram, Behind G.D Goenka School, Danapur, Patna',
      phone: '+91 98765 43211'
    }
  ];

  const services = [
    { name: 'General Consultation', duration: '30 mins', price: '₹500' },
    { name: 'Mental Health Counseling', duration: '45 mins', price: '₹800' },
    { name: 'Stress Management', duration: '40 mins', price: '₹700' },
    { name: 'Family Therapy', duration: '60 mins', price: '₹1000' },
    { name: 'Child Psychology', duration: '45 mins', price: '₹800' },
    { name: 'Career Counseling', duration: '40 mins', price: '₹700' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', rating: 5, text: 'Excellent doctor with great listening skills. Helped me overcome my anxiety issues.' },
    { name: 'Priya Sharma', rating: 5, text: 'Very professional and caring. The online booking made it so convenient.' },
    { name: 'Amit Patel', rating: 5, text: 'Life-changing therapy sessions. Highly recommend to anyone struggling with stress.' }
  ];

  // Generate time slots based on location and day of week
  const getTimeSlotsForDate = (dateString, locationId) => {
    if (!dateString || !locationId) return [];

    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    if (locationId === 'L1') {
      // Location 1: Jagdeo Path
      // Morning: 10:00 AM - 1:00 PM
      const l1Morning = [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'
      ];

      // Evening: 6:00 PM - 8:00 PM
      const l1Evening = [
        '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
      ];

      // Sunday: 5:00 PM - 8:00 PM
      const l1Sunday = [
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
      ];

      if (dayOfWeek === 0) {
        return l1Sunday;
      } else {
        return [...l1Morning, ...l1Evening];
      }
    }
    else if (locationId === 'L2') {
      // Location 2: Danapur
      // Morning: 7:00 AM - 9:00 AM
      const l2Morning = [
        '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM'
      ];

      // Evening: 3:00 PM - 5:00 PM
      const l2Evening = [
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
      ];

      // Sunday Morning: 9:00 AM - 1:00 PM
      const l2SundayMorning = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'
      ];

      if (dayOfWeek === 0) {
        return l2SundayMorning;
      } else {
        return [...l2Morning, ...l2Evening];
      }
    }

    return [];
  };

  const getDayName = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getSelectedLocation = () => {
    return locations.find(loc => loc.id === bookingData.location);
  };

  useEffect(() => {
    if (bookingData.date && bookingData.location) {
      const slots = getTimeSlotsForDate(bookingData.date, bookingData.location);
      setAvailableTimeSlots(slots);

      if (!slots.includes(bookingData.time)) {
        setBookingData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [bookingData.date, bookingData.location]);

  const handleBookingSubmit = async () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
      return;
    }

    try {
      const selectedLocation = getSelectedLocation();
      await createAppointment({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        location: selectedLocation.name,
        locationAddress: selectedLocation.address,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        notes: bookingData.notes
      });

      alert('Booking confirmed! You will receive a confirmation shortly.');
      setShowBookingModal(false);
      setBookingStep(1);
      setBookingData({
        name: '', email: '', phone: '', location: '', date: '', time: '', service: '', notes: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Ritesh Mind Clinic</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Book Appointment
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700">About</a>
              <a href="#services" className="block px-3 py-2 text-gray-700">Services</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700">Testimonials</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full text-left px-3 py-2 text-blue-600 font-semibold"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Your Mental & Physical Wellness Matters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Expert care with compassion. Book your appointment today and take the first step towards better health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  Book Appointment <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <a
                  href="#services"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 text-center"
                >
                  Our Services
                </a>
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">500</div>
                  <div className="text-gray-600">Happy Patients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={doctorImage}
                alt="Doctor"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={logoImage}
                alt="Clinic Logo"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Ritesh Mind Clinic</h2>
              <p className="text-gray-600 mb-4">
                With over 15 years of experience in mental health and wellness, we provide comprehensive care tailored to your unique needs. Our approach combines evidence-based treatments with compassionate support.
              </p>
              <p className="text-gray-600 mb-6">
                We specialize in treating anxiety, depression, stress management, and various mental health concerns. Our mission is to help you achieve optimal mental and emotional well-being.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Award className="h-10 w-10 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Certified Professional</div>
                    <div className="text-sm text-gray-600">Licensed & Board Certified</div>
                  </div>
                </div>
                {/* <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Expert Team</div>
                    <div className="text-sm text-gray-600">Experienced Professionals</div>
                  </div>
                </div> */}
                <div className="flex items-start gap-3">
                  <Building2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Two Locations</div>
                    <div className="text-sm text-gray-600">Convenient Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive care for your mental and emotional well-being</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                  <div className="text-blue-600 font-semibold">{service.price}</div>
                </div>
                <button
                  onClick={() => {
                    setBookingData({ ...bookingData, service: service.name });
                    setShowBookingModal(true);
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600">Visit us at either of our convenient locations</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{location.address}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{location.phone}</span>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Timings:</p>
                      {location.id === 'L1' ? (
                        <>
                          <p className="text-xs text-blue-700">Mon-Sat: 10:00 AM - 1:00 PM, 6:00 PM - 8:00 PM</p>
                          <p className="text-xs text-blue-700">Sunday: 5:00 PM - 8:00 PM</p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-blue-700">Mon-Sat: 7:00 AM - 9:00 AM, 3:00 PM - 5:00 PM</p>
                          <p className="text-xs text-blue-700">Sunday: 9:00 AM - 1:00 PM</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Ritesh Mind Clinic. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Professional Mental Health & Wellness Services</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Book Appointment</h2>
                <button onClick={() => {
                  setShowBookingModal(false);
                  setBookingStep(1);
                }} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex justify-between mb-8 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`flex items-center ${bookingStep >= step ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{step}</div>
                    <span className="ml-2 hidden sm:inline text-sm">
                      {step === 1 ? 'Personal' : step === 2 ? 'Location' : step === 3 ? 'Service' : 'Date & Time'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Steps
              <div className="flex justify-between mb-8">
                <div className={`flex items-center ${bookingStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
                  <span className="ml-2 hidden sm:inline">Personal Info</span>
                </div>
                <div className={`flex items-center ${bookingStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
                  <span className="ml-2 hidden sm:inline">Select Service</span>
                </div>
                <div className={`flex items-center ${bookingStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
                  <span className="ml-2 hidden sm:inline">Date & Time</span>
                </div>
              </div> */}

              <div>
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="+919876543210"
                      />
                      <p className="text-xs text-gray-500 mt-1">Format: +91 followed by 10 digits</p>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium mb-2">Select Location *</label>
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        onClick={() => setBookingData({ ...bookingData, location: location.id })}
                        className={`p-4 border-2 rounded-lg cursor-pointer ${
                          bookingData.location === location.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className={`h-5 w-5 flex-shrink-0 mt-1 ${bookingData.location === location.id ? 'text-blue-600' : 'text-gray-400'}`} />
                          <div className="flex-1">
                            <div className="font-semibold mb-1">{location.name}</div>
                            <div className="text-sm text-gray-600 mb-2">{location.address}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                              <Phone className="h-3 w-3" /> {location.phone}
                            </div>
                            <div className="bg-gray-100 p-2 rounded text-xs">
                              <span className="font-medium">Timings: </span>
                              {location.id === 'L1' ? 
                                'Mon-Sat: 10AM-1PM, 6PM-8PM | Sun: 5PM-8PM' : 
                                'Mon-Sat: 7AM-9AM, 3PM-5PM | Sun: 9AM-1PM'
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {bookingData.date && (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-800">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">{getDayName(bookingData.date)}</span>
                          </div>
                          <p className="text-sm text-blue-600 mt-1">
                            {availableTimeSlots.length} slots available
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Select Time *</label>
                          {availableTimeSlots.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {availableTimeSlots.map((time, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setBookingData({ ...bookingData, time })}
                                  className={`py-2 px-3 rounded-lg text-sm transition-all ${bookingData.time === time
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                              <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                              <p className="font-medium">No slots available for this date</p>
                              <p className="text-sm mt-1">Please select another date</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        rows="3"
                        placeholder="Any specific concerns or requirements..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  {bookingStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setBookingStep(bookingStep - 1)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleBookingSubmit}
                    disabled={
                      (bookingStep === 1 && (!bookingData.name || !bookingData.email || !bookingData.phone)) ||
                      (bookingStep === 2 && !bookingData.service) ||
                      (bookingStep === 3 && (!bookingData.date || !bookingData.time))
                    }
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {bookingStep === 3 ? 'Confirm Booking' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
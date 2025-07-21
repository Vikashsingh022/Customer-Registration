import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './Login.css';

// Initial form state
const defaultForm = {
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  dob: '',
  address: '',
  password: '',
  confirmPassword: '',
  latitude: '',
  longitude: '',
};

const ADDRESS_MAX_LENGTH = 200;

function RegistrationForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [locationError, setLocationError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Autofill user data if phone exists in DB
  useEffect(() => {
    if (form.phone.length === 10) {
      fetch(`http://localhost:5000/user-by-phone/${form.phone}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setForm(f => ({
              ...f,
              fullName: data.full_name || '',
              email: data.email || '',
              gender: data.gender || '',
              dob: data.dob ? data.dob.slice(0, 10) : '',
              address: data.address || '',
              latitude: data.latitude || '',
              longitude: data.longitude || ''
            }));
          }
        })
        .catch(() => {});
    }
    // eslint-disable-next-line
  }, [form.phone]);

  // Validate form fields
  function validateForm() {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.dob) newErrors.dob = 'Date of Birth is required';
    else {
      // User must be at least 15 years old
      const dobDate = new Date(form.dob);
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
      if (dobDate > minDate) newErrors.dob = 'Age is less than 15 years';
    }
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  }

  // Handle input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // Get geolocation
  function handleGetLocation() {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocationError('');
      },
      () => setLocationError('Permission denied or unavailable')
    );
  }

  // Password strength helper
  function getPasswordStrength(password) {
    if (!password) return { label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: 'Weak', color: '#e57373' };
    if (score === 2) return { label: 'Medium', color: '#ffb74d' };
    if (score >= 3) return { label: 'Strong', color: '#81c784' };
    return { label: '', color: '' };
  }
  const passwordStrength = getPasswordStrength(form.password);

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Optionally capture device info
      const deviceInfo = `${navigator.userAgent} | ${navigator.platform}`;
      fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, device_info: deviceInfo }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to register');
          return res.text();
        })
        .then(() => {
          setSubmitted(true);
        })
        .catch(err => {
          setSubmitted(false);
          alert('Registration failed: ' + err.message);
        });
    }
  }

  // Blur/Focus helpers for animation
  const isBlurred = field => focusedField && focusedField !== field;
  const isFocused = field => focusedField === field;

  if (submitted) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '2rem',
        fontFamily: 'sans-serif'
      }}>
        User successfully registered
      </div>
    );
  }

  return (
    <div className="login-background" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated background */}
      <Particles
        id="tsparticles"
        init={loadSlim}
        options={{
          fullScreen: false,
          background: { color: '#181c20' },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'out' },
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            },
            links: {
              enable: true,
              distance: 120,
              color: '#ffffff',
              opacity: 0.2,
              width: 1
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
              resize: true
            },
            modes: {
              repulse: { distance: 150, duration: 0.4 },
              push: { quantity: 4 }
            }
          },
          detectRetina: true
        }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      {/* Registration box */}
      <motion.div
        className="login-glass"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
        drag
        dragConstraints={{ top: -200, left: -400, right: 400, bottom: 200 }}
      >
        <h2>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-columns">
            {/* Left column */}
            <div className="form-col">
              {/* Full Name */}
              <div className={`form-item${isBlurred('fullName') ? ' blurred' : ''}${isFocused('fullName') ? ' focused' : ''}`}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                {errors.fullName && <div className="error-msg">{errors.fullName}</div>}
              </div>
              {/* Email */}
              <div className={`form-item${isBlurred('email') ? ' blurred' : ''}${isFocused('email') ? ' focused' : ''}`}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                {errors.email && <div className="error-msg">{errors.email}</div>}
              </div>
              {/* Phone */}
              <div className={`form-item${isBlurred('phone') ? ' blurred' : ''}${isFocused('phone') ? ' focused' : ''}`}>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  maxLength={10}
                />
                {errors.phone && <div className="error-msg">{errors.phone}</div>}
              </div>
              {/* Gender */}
              <div className={`form-item${isBlurred('gender') ? ' blurred' : ''}${isFocused('gender') ? ' focused' : ''}`}>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="select-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <div className="error-msg">{errors.gender}</div>}
              </div>
              {/* Date of Birth */}
              <div className={`form-item${isBlurred('dob') ? ' blurred' : ''}${isFocused('dob') ? ' focused' : ''}`}>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  value={form.dob}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('dob')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{ color: form.dob ? '#fff' : '#aaa' }}
                />
                {errors.dob && <div className="error-msg">{errors.dob}</div>}
              </div>
            </div>
            {/* Right column */}
            <div className="form-col">
              {/* Address */}
              <div className={`form-item${isBlurred('address') ? ' blurred' : ''}${isFocused('address') ? ' focused' : ''}`}>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('address')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={3}
                  className="textarea-input"
                  maxLength={ADDRESS_MAX_LENGTH}
                />
                {errors.address && <div className="error-msg">{errors.address}</div>}
                <div className="char-count">{form.address.length}/{ADDRESS_MAX_LENGTH}</div>
              </div>
              {/* Password */}
              <div className={`form-item${isBlurred('password') ? ' blurred' : ''}${isFocused('password') ? ' focused' : ''}`}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 chars)"
                  value={form.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                {errors.password && <div className="error-msg">{errors.password}</div>}
                {form.password && (
                  <div className="password-strength">
                    <div className="strength-bar" style={{ background: passwordStrength.color }} />
                    <span style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                  </div>
                )}
              </div>
              {/* Confirm Password */}
              <div className={`form-item${isBlurred('confirmPassword') ? ' blurred' : ''}${isFocused('confirmPassword') ? ' focused' : ''}`}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
              </div>
              {/* Location fields and map */}
              <div className={`form-item${isBlurred('location') ? ' blurred' : ''}${isFocused('location') ? ' focused' : ''}`}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    value={form.latitude}
                    readOnly
                    className="latlong-input"
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    value={form.longitude}
                    readOnly
                    className="latlong-input"
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <button type="button" onClick={handleGetLocation} style={{ margin: '10px 0' }}>
                  Get Location
                </button>
                {locationError && <div className="error-msg">{locationError}</div>}
                {form.latitude && form.longitude && (
                  <div className="map-preview">
                    <iframe
                      title="Location Preview"
                      width="100%"
                      height="180"
                      style={{ border: 0, borderRadius: 8, marginTop: 8 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(form.longitude)-0.01}%2C${parseFloat(form.latitude)-0.01}%2C${parseFloat(form.longitude)+0.01}%2C${parseFloat(form.latitude)+0.01}&layer=mapnik&marker=${form.latitude}%2C${form.longitude}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Submit button */}
          <button type="submit" className="register-btn">Register</button>
        </form>
      </motion.div>
    </div>
  );
}

export default RegistrationForm; 
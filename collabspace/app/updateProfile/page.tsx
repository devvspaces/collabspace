"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface ProfileData {
  name: {
    firstName: string;
    lastName: string;
  };
  email: {
    address: string;
  };
  bio: {
    text: string;
  };
}

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: {
      firstName: '',
      lastName: '',
    },
    email: {
      address: '',
    },
    bio: {
      text: '',
    },
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch the profile data from the JSON server
    axios.get('http://localhost:4000/profile')
      .then(response => setProfileData(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Update the form data when profile data changes
    setFormData({
      firstName: profileData.name?.firstName || '',
      lastName: profileData.name?.lastName || '',
      email: profileData.email?.address || '',
      bio: profileData.bio?.text || '',
    });
  }, [profileData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Update the profile data on the JSON server
    axios.put('http://localhost:4000/profile', {
      ...profileData,
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: {
        address: formData.email,
      },
      bio: {
        text: formData.bio,
      },
    })
      .then(response => {
        // Handle the response and show success message
        console.log('Profile updated successfully!');
      })
      .catch(error => {
        // Handle the error and show error message
        console.error('Error updating profile:', error);
      });
  };

  // Render the update profile form
  return (
    <div style={{ fontSize: '20px', marginLeft: '150px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Update profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ border: '1px solid black' }}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{ border: '1px solid black',marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ border: '1px solid black',marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={{ border: '1px solid black',marginBottom: '5px' }}
          />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: 'grey', borderColor: 'black', borderRadius: '5px' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
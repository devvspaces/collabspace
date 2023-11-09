import React, { useState, useEffect } from 'react';
const [profileData, setProfileData] = useState({
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
"use client";
import React, { useState, useEffect } from 'react';
<head>
  <link rel="stylesheet" href="publicInfo/publicInfo.css"/>
</head>
interface Profile {
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  html_url: string;
  login: string;
  company: string;
}

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [collaboratedProjects, setCollaboratedProjects] = useState<any[]>([]);
  const [createdProjects, setCreatedProjects] = useState<any[]>([]);
  const fetchProfile = () => {
    setLoading(true);
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?type=all`),
      fetch(`https://api.github.com/users/${username}/repos?sort=created`)
    ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(([profile, collaboratedProjectsResponse, createdProjectsResponse]) => {
        setProfile(profile);
        setCollaboratedProjects(collaboratedProjectsResponse);
        setCreatedProjects(createdProjectsResponse);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ marginLeft: '150px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>User public Profile</h2>
      <label htmlFor="username">Enter username:</label>
      <input type="text" id="username" onChange={e => setUsername(e.target.value)} />
      <button style={{ backgroundColor: 'grey', borderColor: 'black', borderRadius: '5px' }} onClick={fetchProfile}>Fetch</button>

      {profile && (
        <div>
          <h1>name: {profile.name}</h1>
          <img src={profile.avatar_url} alt={profile.name} />
          <p>bio :{profile.bio}</p>
          <p>company: {profile.company}</p>
          <p>location: {profile.location}</p>
          <a href={profile.html_url} style={{ color: 'blue', textDecoration: 'underline' }}>View on GitHub</a>
          <div id="user-name">username: {profile.login}</div>
          
        </div>
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
}
import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>No profile data found. Please log in.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;

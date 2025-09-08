import React, { useState, useContext, useRef, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { FiEdit2 } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(user);
  const fileInputRef = useRef(null);

 
  useEffect(() => {
    setTempProfile(user);
  }, [user]);

  
  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempProfile({ ...tempProfile, image: imageUrl });
      updateProfile({ image: imageUrl }); 
    }
  };

  
  const handleSave = () => {
    updateProfile(tempProfile); 
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(user); 
    setIsEditing(false);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content">
        <h1 className="profile-header">User Profile</h1>

        <div className="profile-container">
          
          <div className="profile-left">
            <div className="profile-picture">
              <img
                src={tempProfile.image}
                alt="Profile"
                className="profile-img"
              />
            </div>
            <button
              className="edit-picture-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Edit Profile Picture
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          
          <div className="profile-right">
            <div className="profile-header-row">
              <h2>{user.name}</h2>
              {!isEditing && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>

            
            <div className="form-group">
              <label>Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={tempProfile.contact}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.contact || "No registered services, you can add some on the settings page."}</p>
              )}
            </div>

           
            <div className="form-group">
              <label>Biography</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bio"
                  value={tempProfile.bio}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.bio || "No biography has been added"}</p>
              )}
            </div>

           
            <div className="form-group">
              <label>Links</label>
              {isEditing ? (
                <input
                  type="text"
                  name="links"
                  value={tempProfile.links}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.links || "No links have been added"}</p>
              )}
            </div>

            
            {isEditing && (
              <div className="profile-actions">
                <button className="cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

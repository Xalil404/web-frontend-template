import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Import the API service

const Profile = () => {
    const [profile, setProfile] = useState({ bio: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await api.get('/profiles/');
                if (response.data.length > 0) {
                    setProfile(response.data[0]); // Assuming you only need the first profile
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error fetching profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = {
                ...profile,
            };

            const response = await api.put(`/profiles/${profile.id}/`, updatedProfile);
            setProfile(response.data); // Update the state with the updated profile
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile');
        }
    };

    const handleProfileDelete = async () => {
        try {
            await api.delete(`/profiles/${profile.id}/`); // Call API to delete the profile
            alert('Profile deleted successfully');
            setProfile({ bio: '', image: '' }); // Reset profile state after deletion
        } catch (error) {
            console.error('Error deleting profile:', error);
            setError('Error deleting profile');
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {error && <p className="text-danger">{error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isEditing ? (
                        <form onSubmit={handleProfileUpdate}>
                            <div>
                                <label>Bio</label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Image</label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setProfile({ ...profile, image: e.target.files[0] })
                                    }
                                />
                            </div>
                            <button type="submit">Update Profile</button>
                        </form>
                    ) : (
                        <div>
                            <p>Bio: {profile.bio}</p>
                            {profile.image && (
                                <img
                                    src={URL.createObjectURL(profile.image)} // Use URL.createObjectURL for file preview
                                    alt="Profile"
                                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                                />
                            )}
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            <button onClick={handleProfileDelete}>Delete Profile</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;


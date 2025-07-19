import axios from '../api/axiosClient';

export const getProfile = async () => {
  const res = await axios.get('/auth/me');
  return res.data;
};

export const getUserProfile = async () => {
  const res = await axios.get('/auth/user-profile');
  return res.data;
};

export const updateProfile = async (profileData, avatarFile = null) => {
  const formData = new FormData();
  
  // Add profile data to FormData
  Object.keys(profileData).forEach(key => {
    if (profileData[key] !== undefined && profileData[key] !== null && profileData[key] !== '') {
      formData.append(key, profileData[key]);
    }
  });
  
  // Add avatar file if provided
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
  
  const res = await axios.put('/auth/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const uploadAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);
  
  const res = await axios.post('/auth/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const changePassword = async (passwordData) => {
  const res = await axios.put('/auth/change-password', passwordData);
  return res.data;
};

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const EditUserInfoForm = ({ user, onSave }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    // Check if password and confirm password match
    if (editedUser.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(editedUser);
    onSave();
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <Typography variant="h5">Edit User Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={editedUser.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUserInfoForm;

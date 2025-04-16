import React, { useState } from 'react';
  import { Box, Container, Typography, TextField, Button, Card, CardContent, useTheme, Alert, Link } from '@mui/material';
  import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
  import { useAuth } from '../contexts/AuthContext';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebaseConfig';

  const Signup = ({ setIsLoggedIn, setUserRole }) => {
    const { user } = useAuth();
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCoach, setIsCoach] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
      e.preventDefault();
      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        setUserRole(isCoach ? 'coach' : 'player');
        setError(null);
      } catch (error) {
        console.log(error); // Debug the exact error
        setError(error.message);
      }
    };

    if (user) {
      return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Card sx={{ borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">Already signed up as {user.email}</Typography>
              <Button variant="outlined" href="/login" sx={{ mt: 2, borderRadius: 3 }}>Go to Login</Button>
            </CardContent>
          </Card>
        </Container>
      );
    }

    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CoachAI Signup
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Create an account to access your dashboard
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                type="submit"
                fullWidth
                sx={{ borderRadius: 3, py: 1.5 }}
              >
                Sign Up
              </Button>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Have an account? <Link href="/login" underline="hover">Sign in</Link>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Role:</Typography>
                <Button onClick={() => setIsCoach(false)} variant={isCoach ? 'text' : 'contained'} sx={{ borderRadius: 3 }}>Player</Button>
                <Button onClick={() => setIsCoach(true)} variant={isCoach ? 'contained' : 'text'} sx={{ borderRadius: 3 }}>Coach</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  };

  export default Signup;
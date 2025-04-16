import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  FormControlLabel,
  Checkbox,
  Alert,
  Link,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCoach, setIsCoach] = useState(false);
  const [error, setError] = useState(null);

  // Redirect to /home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUserRole(isCoach ? 'coach' : 'player');
      setError(null);
      navigate('/home');
    } catch (error) {
      console.log(error); // Debug the exact error
      setError(error.message);
    }
  };

  if (user) {
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
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">Logged in as {user.email}</Typography>
            <Button
              variant="outlined"
              onClick={logout}
              sx={{ mt: 2, borderRadius: 3 }}
            >
              Logout
            </Button>
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
              CoachAI Login
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Sign in to access your performance dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCoach}
                  onChange={(e) => setIsCoach(e.target.checked)}
                  color="primary"
                />
              }
              label="Login as Coach"
            />
            <Button
              variant="contained"
              startIcon={<LoginIcon />}
              type="submit"
              fullWidth
              sx={{ borderRadius: 3, py: 1.5 }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Don’t have an account? <Link href="/signup" underline="hover">Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
import React, { useState } from 'react';
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
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const Login = ({ setIsLoggedIn, setUserRole }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCoach, setIsCoach] = useState(false);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserRole(isCoach ? 'coach' : 'player');
  };

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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              fullWidth
              sx={{ borderRadius: 3, py: 1.5 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
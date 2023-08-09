import React from 'react';
import { Typography} from '@mui/material';
import { useAuth } from '../../base/AuthContext';

const MasterAdminHome = () => {
  const auth = useAuth();

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Master Admin Home
      </Typography>
    </div>
  );
};

export default MasterAdminHome;
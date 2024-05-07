//
// Homework 3: MUI Components
// Header JavaScript source code
//
// Author: Shreya Ashok Kumar
// Version: 1.0
//
import './Header.css';
import {Box, Typography} from '@mui/material';

function Header(props) {
  return (
      <Box className="Header">
        <Typography variant="h1" sx={{
          fontSize : '30px',
          padding : '10px',
        }}>
          {props.text}
        </Typography>
      </Box>
  );
}

export default Header;

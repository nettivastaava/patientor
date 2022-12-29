import React from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Gender } from '../types';


const GenderIcon = ({ gender }: { gender: Gender}) => {
  if (gender === 'male') {
    return <MaleIcon />;
  } else if (gender === 'female') {
    return <FemaleIcon />;
  }

  return <QuestionMarkIcon />;
};

export default GenderIcon;
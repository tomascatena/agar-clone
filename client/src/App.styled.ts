import { styled } from '@mui/material/styles';
import starfield from '@/assets/images/starfield.jpg';

export const StyledCanvas = styled('canvas')({
  backgroundImage: `url(${starfield})`,
});

export const MainContainer = styled('div')({
  position: 'relative',
});

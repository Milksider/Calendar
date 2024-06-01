import { Box } from '@mui/material';
import { HeaderTabSX } from './stylesSX';
import { END_TIME, START_TIME } from '@Constants/';

export const HeaderTab = () => {
  const timeCells = [];
  for (let i = START_TIME; i <= END_TIME; i++) {
    timeCells.push(
      <Box key={i} sx={HeaderTabSX.timeBox}>
        {i}:00
      </Box>,
    );
  }
  return (
    <Box sx={HeaderTabSX.container}>
      <Box sx={HeaderTabSX.emptyCell} />
      <Box sx={HeaderTabSX.cells}>{timeCells}</Box>
    </Box>
  );
};

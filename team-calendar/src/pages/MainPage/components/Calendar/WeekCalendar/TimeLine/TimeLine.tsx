import { END_TIME, START_TIME } from '@Constants/';
import { Box } from '@mui/material';
import {ContainerSX, TimeLineSX} from './TimeLine.styles';

export const TimeLine = () => {
  const timeCells = [];
  for (let i = START_TIME; i <= END_TIME; i++) {
    timeCells.push(<Box key={i} sx={TimeLineSX.timeCell}>{i}:00</Box>);
  }
  return (
      <Box sx={ContainerSX}>
        <Box sx={TimeLineSX.container}>
          <Box>{timeCells}</Box>
        </Box>
      </Box>
  );
};

import {Box, Table, TableCell, TableRow} from '@mui/material';
import {TableRowSX, TableSX} from './WeekDaysLine.styles';
import {useTranslation} from 'react-i18next';

import mon from "@Assets/images/icons/week/mon.svg"
import tue from "@Assets/images/icons/week/tue.svg"
import wed from "@Assets/images/icons/week/wed.svg"
import thur from "@Assets/images/icons/week/thur.svg"
import fri from "@Assets/images/icons/week/fri.svg"
import sat from "@Assets/images/icons/week/sat.svg"
import sun from "@Assets/images/icons/week/sun.svg"
import {CustomImage} from "@Components/CustomImage/CustomImage";

export const WEEK_DATA = [
    {titlePath: 'mo', src: mon},
    {titlePath: 'tu', src: tue},
    {titlePath: 'we', src: wed},
    {titlePath: 'th', src: thur},
    {titlePath: 'fr', src: fri},
    {titlePath: 'sat', src: sat},
    {titlePath: 'sun', src: sun},
];

export const WeekDaysLine = () => {
  const {t} = useTranslation();

  return (
    <Table sx={TableSX}>
      <TableRow sx={TableRowSX}>
        {WEEK_DATA.map(({ titlePath, src }) => (
          <TableCell key={titlePath}>
              <CustomImage src={src}/>
            <Box>{t(`app.datesTitle.${titlePath}`, titlePath)}</Box>
          </TableCell>
        ))}
      </TableRow>
    </Table>
  );
};

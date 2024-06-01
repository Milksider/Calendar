import {Box} from "@mui/material";
import {
  CellEventTitleContainerSX,
  CellEventContainerSX, EventColorSX, EventTitleSX,
} from './CellEvent.styles';
import {ICellEvent} from "./CellEvent.types";
import {FC} from "react";
import dayjs from "dayjs";

export const CellEvent: FC<ICellEvent> = ({title, color, time}) => {
    const startTime = dayjs(String(time)).format('HH:mm');

    return (
        <Box sx={CellEventContainerSX}>
            <Box sx={CellEventTitleContainerSX}>
                <Box sx={EventColorSX(color)}></Box>
                <Box sx={EventTitleSX(color)}>{title}</Box>
            </Box>
            <Box>{startTime}</Box>
        </Box>
    );
};

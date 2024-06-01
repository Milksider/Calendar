import React, {FC, memo, useState} from 'react';
import { Box, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { EventTypesSX } from './stylesSX';
import { IEventTypes } from './EventTypes.types';
import { ChangeEventType, ITypes, NestedModal } from '@Components/Modals';
import { useChangeTypeMutation } from '@Store/types';

const EventTypeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 420,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export const EventTypes: FC<IEventTypes> = memo(({ allTypes }) => {
  const [isChangeEventType, setIsChangeEventType] = useState(false);
  const [dataEventType, setDataEventType] = useState<ITypes>();

  const [changeType] = useChangeTypeMutation();

  const onEventTypeClick = (data: ITypes) => {
    setDataEventType(data);
    setIsChangeEventType(!isChangeEventType);
  };

  const onChangeEventType = (data: ITypes) => {
    if (dataEventType) {
      const changeData = { ...data, id: dataEventType.id };
      changeType(changeData);
    }
  };

  return (
    <> {
      allTypes.map(type => (
        <EventTypeTooltip key={type.id}
                          title={
                            <React.Fragment>
                              {type.title}
                            </React.Fragment>
                          }>
          <Box onClick={() => onEventTypeClick(type)}
               sx={[EventTypesSX.typeBox, { backgroundColor: type.color }]}>
            {type.title}
          </Box>
        </EventTypeTooltip>
      ))
    }
      <NestedModal open={isChangeEventType}
                   setIsConfirmModal={setIsChangeEventType}>
        <ChangeEventType
          setOpen={setIsChangeEventType}
          setNewEventType={onChangeEventType}
          typeData={dataEventType}
        />
      </NestedModal>
    </>
  );
});

EventTypes.displayName = 'EventTypes';

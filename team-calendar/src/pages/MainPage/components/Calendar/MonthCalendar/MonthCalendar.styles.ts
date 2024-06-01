export const MonthCalendarContainerSX = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'repeat(6, 1fr)',
    gridGap: '1px',
}

export const CalendarCellSX = (isBoundary: boolean, isToday: boolean) => ({
    width: '174px',
    height: '184px',
    backgroundColor: isBoundary ? 'background.backgroundGrayF2' : (isToday ? 'background.backgroundBlueF5' : 'white'),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
})

export const ContainerSX = {
    display: 'flex',
    justifyContent: 'center',
}

export const DateWrapperSX = {
    marginTop: '12px',
    marginLeft: '12px',
    more: {
        color: 'text.textBlue0C',
        fontSize: '14px',
        fontWeight: '600',
    }
}

export const GreyBackgroundSX = {
    backgroundColor: 'background.backgroundGrayDA',
    padding: '2px 1px 2px 1px'
}

export const CellEventWrapperSX = {
    margin: 'auto 6px 6px 6px',
}

export const WrapperSX = {
    ' .MuiTableRow-root': {
        border: '1px solid',
        borderBottom: '0',
        borderColor: 'background.backgroundGrayDA',
        padding: '0 3px',
    }
}

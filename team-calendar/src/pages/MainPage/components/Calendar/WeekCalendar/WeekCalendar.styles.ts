export const WeekCalendarSX = {
  calendar: {
    backgroundColor: 'white',
    ' .MuiTableRow-root': {
      border: '1px solid',
      borderBottom: '0',
      borderColor: 'background.backgroundGrayDA',
      paddingLeft: '62px',
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    width: '174px',
    height: '80px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start'
  },
  bookingCellsContainer: {
    backgroundColor: 'background.backgroundGrayDA',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'repeat(13, 1fr)',
    gridGap: '1px',
    padding: '2px 1px 2px 1px'
  },
  titleContainer: {
    display: 'flex',
    gap: '2px',
    ' img': {
      marginTop: '2px',
      width: '10px',
      height: '10px'
    }
  },
  bookingTitle: {
    maxWidth: '110px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
  }
}

export const EventContainerSX = (color: string) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '10px',
  fontWeight: '600',
  margin: '2px 4px',
  padding: '4px',
  borderRadius: '3px',
  border: `1px solid rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
      color.slice(3, 5),
      16
  )}, ${parseInt(color.slice(5, 7), 16)}, 0.5)`,
  backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
      color.slice(3, 5),
      16
  )}, ${parseInt(color.slice(5, 7), 16)}, 0.3)`,
  color: color,
  height: 'auto',
  alignItems: 'top'
})

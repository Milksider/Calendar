export const TabLineSX = {
  userBox: {
    display: 'flex',
    border: 1,
    borderColor: 'primary.dark',
    width: '20vw',
    backgroundColor: 'background.tabDesc',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  userName: {
    paddingLeft: 1,
    color: 'text.primary',
    fontSize: '1.2vw',
    fontWeight: 'bold',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  timeCells: {
    display: 'flex',
    width: '100%',
  },
  cell: {
    border: 1,
    borderColor: 'primary.dark',
    width: '100%',
    display: 'flex',
  },
  start:{
    justifyContent: 'flex-start',
  },
  end:{
    justifyContent: 'flex-end',
  },
  cellHover: {
    '&:hover': {
      borderColor: 'background.backgroundLight',
    },
  },
  bookingCell: {
    backgroundColor: 'background.event',
    height: '100%',
    cursor: 'pointer',
    width: '0',
  },
};

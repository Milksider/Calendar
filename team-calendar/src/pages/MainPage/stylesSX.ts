export const MainPageSX = {
  tabContainer: {
    overflow: 'auto',
  },
  tabContainerWebkit: {
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  tabLineBox: {
    display: 'flex',
    backgroundColor: 'background.backgroundDark',
  },
  tabLineBoxHover: {
    '&:hover': {
      backgroundColor: 'background.tabDesc',
    },
  },
};

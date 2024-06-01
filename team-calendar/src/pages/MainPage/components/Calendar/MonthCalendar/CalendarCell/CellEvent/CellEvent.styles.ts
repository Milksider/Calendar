
export const CellEventContainerSX = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontWeight: '600',
}

export const CellEventTitleContainerSX = {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
    alignItems: 'center',

}

export const EventColorSX = (color?: string) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color || 'white',
})

export const EventTitleSX = (color?: string) => ({
    maxWidth: '110px',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    color: color || 'black',
})

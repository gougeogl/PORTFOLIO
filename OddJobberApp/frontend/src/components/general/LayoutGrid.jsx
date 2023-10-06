/*****************************************************************************
■ Filename: LayoutGrid.jsx
◘ Description:
    • React Components
    • A collection of components used to implement a CSS grid structure.
      The various components below are used by the Layouts components.
      Each layout is built using 1+ of the below components.

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : ø 
• Theme: √
******************************************************************************/

// Mui Components
import Box from "@mui/material/Box";

// Styling
import { styled } from "@mui/material";

const HomeGridContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(4, auto)`,
    gridTemplateRows: `repeat(5, auto)`,
    gridTemplateAreas:
    `
        "header header header header"
        "content content content content"
        "content content content content"
        "content content content content" 
        "footer footer footer footer"
    `,
    alignItems: 'start',
    justifyContent: 'space-between'
}));

const PageGridContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: `36vw 19vw 19vw 19vw`,
    gridTemplateRows: `repeat(5, auto)`,
    gridTemplateAreas:
    `
        "header header header header"
        "sidebar content content content"
        "sidebar content content content"
        "sidebar content content content" 
        "footer footer footer footer"
    `,
    alignItems: 'start',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.light && theme.palette.primary.light
}));

const GridHeader = styled(Box)(({ theme }) => ({
    gridArea: 'header',
    paddingBottom: '1vh',
    backgroundColor: theme.palette.secondary.dark && theme.palette.secondary.dark 
}));

const GridSidebar = styled(Box)(({ theme }) => ({
    gridArea: 'sidebar',
    minHeight: '90vh',
    padding: '1vh 2vw 1vh 3vw',
    backgroundColor: theme.palette.primary.main && theme.palette.primary.main
}));

const GridContent = styled(Box)(({ theme }) => ({
    gridArea: 'content',
    minHeight: '90vh',
    padding: '1vh 2vw 1vh 2vw',
    backgroundImage: theme.backgroundImage && theme.backgroundImage,
    backgroundRepeat: theme.backgroundRepeat && theme.backgroundRepeat,
    backgroundPosition: theme.backgroundPosition && theme.backgroundPosition,
    backgroundSize: theme.backgroundSize && theme.backgroundSize,
    backgroundColor: theme.palette.secondary.light && theme.palette.secondary.light
}));

const GridFooter = styled(Box)(({ theme }) => ({
    gridArea: 'footer',
    backgroundColor: theme.palette.primary.main && theme.palette.primary.main
}));

export {
    HomeGridContainer,
    PageGridContainer,
    GridHeader,
    GridSidebar,
    GridContent,
    GridFooter
}
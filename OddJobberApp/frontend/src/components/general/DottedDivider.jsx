/************************************************
■ Filename: DottedDivider.jsx
◘ Description:
    • React Component
    • A vertical dotted black bar. used, e.g., 
      to separate text, buttons, etc.

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : ø 
• Theme: ø
************************************************/

// Mui Components
import Divider from "@mui/material/Divider";

// Styling
import { styled } from "@mui/material";

const DottedDivider = styled((props) => {
    return(
        <Divider
            {...props}
            orientation="vertical"
            flexItem
        />
    )
})(({ theme }) => ({
    marginLeft: '3%',
    border: '1px dotted black'
}));

export default DottedDivider;
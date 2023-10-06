/************************************************
■ Filename: CustomField.jsx
◘ Description:
    • React Component
    • Includes 2% margin top & bottom

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : ø 
• Theme: ø
************************************************/

// Mui Components
import TextField from "@mui/material/TextField";

// Styling
import { styled } from "@mui/material";

const CustomField = styled(TextField)(() => ({
    marginTop: '2%',
    marginBottom: '2%',
}));

export default CustomField;
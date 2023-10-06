/***************************************************************
■ Filename: ModalFormWrapper.jsx
◘ Description:
    • React Component
    • Wraps various forms as a modal. 
      Only the controlling button is seen at first. 
      Actual content uses the styled hook.

◘ Custom Dependencies: ø 
◘ State: √ 
    ○ Global : ø
    ○ Local  : √ 
• Theme: √
*****************************************************************/
// React
import { Fragment, useState } from 'react';

// Mui Components
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

// Icons & Styling
import EditIcon from '@mui/icons-material/Edit';
import { Typography, styled } from '@mui/material';
import { useTheme } from '@emotion/react';

const ModalFormWrapper = ({ children, buttonLabel, icon }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Fragment>
            <Button
                onClick={handleOpen}
                endIcon={icon ? icon : <EditIcon />}
                fullWidth
                sx={icon ? {
                    backgroundColor: theme.palette.secondary.dark,
                    borderBottom: 5,
                    borderColor: theme.palette.primary.contrastText,
                    color: theme.palette.secondary.main,
                    "&:hover": {
                        backgroundColor: theme.palette.error.dark,
                        color: theme.palette.error.contrastText
                    }} 
                    :
                    { 
                        color: theme.palette.secondary.dark,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.contrastText
                        }
                    
                    }
                }
            >
                <Typography variant="subtitle1">{buttonLabel ? buttonLabel : null}</Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                onSubmit={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
            >
                <Fade in={open}>
                    <ModalContentBox theme={theme}>
                        {children}
                    </ModalContentBox>
                </Fade>
            </Modal>
        </Fragment>
    )
}

const ModalContentBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    padding: '1%',
    backgroundColor: theme.palette.background.paper && theme.palette.background.paper,
    borderStyle: 'solid',
    borderWidth: 'thick',
    borderRadius: '4px',
    borderColor: theme.palette.secondary.dark && theme.palette.secondary.dark,
    boxShadow: 24,
    p: 4,
}));

export default ModalFormWrapper;
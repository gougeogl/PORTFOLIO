/***************************************************************
■ Filename: MernFooter.jsx
◘ Description:
    • React Component
    • Footer that displays the MERN stack technologies:
      MongoDB, Express JS, React JS, & Node JS

◘ Custom Dependencies: ø 
◘ State: ø 
    ○ Global : ø
    ○ Local  : ø 
• Theme: ø
*****************************************************************/

// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Images
import MongoDB from '../../images/backgrounds/mern/MongoDB.png'; // M
import ExpressJS from '../../images/backgrounds/mern/ExpressJS.png'; // E
import ReactJS from '../../images/backgrounds/mern/ReactJS.png'; // R
import NodeJS from '../../images/backgrounds/mern/NodeJS.png'; // N

const MernFooter = () => {
    return(
        <ImageList cols={4}>
            <ImageListItem>
                <ImgBlockAndLetter src={MongoDB} letter="M"/>
            </ImageListItem>
            <ImageListItem>
                <ImgBlockAndLetter src={ExpressJS} letter="E"/>
            </ImageListItem>
            <ImageListItem>
                <ImgBlockAndLetter src={ReactJS} letter="R"/>
            </ImageListItem>
            <ImageListItem>
                <ImgBlockAndLetter src={NodeJS} letter="N"/>
            </ImageListItem>
        </ImageList>
    )
}

const ImgBlockAndLetter = ({ src, letter }) => {
    return(
        <>
            <Typography variant="h4" alignSelf="center">{letter}</Typography>
            <Box 
                component='img'
                src={src}
                loading='lazy'
                sx={{ maxHeight: '8vh', objectFit: 'scale-down' }}
            />
        </>
    )
}

export default MernFooter;
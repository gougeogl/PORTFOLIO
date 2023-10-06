/***********************************************************
 ◘ filename: HomeLayout.jsx 
 ◘ Description:
    Layout template component used to structure the
    home and about pages of the OddJobber App.
    The three areas include a header, footer, content.
    A hidden <ErrorPane> component is also attached.

 ◘ Dependenies:
    file: LayoutGrid.jsx (contains styled components to 
          implement a CSS grid rather than an Mui (flexbox))
 ***********************************************************/

// React
import { Fragment } from "react";

// Custom Components
import Navbar from "../components/general/Navbar";
import PageNav from "../components/general/PageNav";
import {
    HomeGridContainer,
    GridHeader,
    GridContent,
    GridFooter
} from "../components/general/LayoutGrid";
import ErrorPane from "../components/AuthN/ErrorPane";
import MernFooter from "../components/general/MernFooter";

// Styling
import Background from '../images/backgrounds/background1.png';
import { createTheme, useTheme } from "@mui/material";

const HomeTheme = createTheme({
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
});

const BasicLayout = ({ children }) => {
    const theme = useTheme();

    return(
        <Fragment>
            <ErrorPane />
            <HomeGridContainer>
                <GridHeader theme={theme}>
                    <Navbar />
                    <PageNav />
                </GridHeader>
                <GridContent theme={HomeTheme}>
                    { children }
                </GridContent>
                <GridFooter theme={theme}>
                    <MernFooter />
                </GridFooter>
            </HomeGridContainer>
        </Fragment>
    );
}

export default BasicLayout;
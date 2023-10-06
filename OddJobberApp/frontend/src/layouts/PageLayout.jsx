/***********************************************************
 ◘ filename: PageLayout.jsx 
 ◘ Description:
    Layout template component used to structure the skills,
    workers, and projects pages of the OddJobber App.
    The four areas include a header, footer, content, and
    a sidebar. The sidebar is permanently on the left. A
    hidden <ErrorPane> component is also attached.

 ◘ Dependenies:
    file: LayoutGrid.jsx (contains styled components to 
          implement a CSS grid rather than an Mui (flexbox))
 ***********************************************************/
// React
import { Fragment } from "react";

// Mui Components
import Box from "@mui/material/Box";

// Custom Components
import Navbar from "../components/general/Navbar";
import PageNav from "../components/general/PageNav";
import ErrorPane from "../components/AuthN/ErrorPane";
import MernFooter from "../components/general/MernFooter";
import {
    PageGridContainer,
    GridHeader,
    GridSidebar,
    GridContent,
    GridFooter
} from "../components/general/LayoutGrid";

// Styling
import { styled } from "@mui/material";
import { useTheme } from "@mui/material";

const MarginedBox = styled(Box)(({ theme }) => ({
    padding: '5%',
    marginTop: '1vh',
    marginBottom: '1vh',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '4%'
}));

const PageLayout = ({ children, form, search }) => {
    const theme = useTheme();

    return(
        <Fragment>
            <ErrorPane />
            <PageGridContainer theme={theme}>
                <GridHeader theme={theme}>
                    <Navbar />
                </GridHeader>
                <GridSidebar theme={theme}>
                    <PageNav />
                    { form && 
                        <MarginedBox theme={theme}>
                            {form}
                        </MarginedBox> 
                    }
                    { search }
                </GridSidebar>
                <GridContent theme={theme}>
                    { children }
                </GridContent>
                <GridFooter theme={theme}>
                    <MernFooter />
                </GridFooter>
            </PageGridContainer>
        </Fragment>
    );
}

export default PageLayout;
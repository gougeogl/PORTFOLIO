/******************************************************
 ◘ filename: LoginPage.jsx 
 ◘ Description: The OddJobber App Login page
 ******************************************************/

// Custom Components
import PageLayout from "../layouts/PageLayout";
import LoginForm from "../components/AuthN/LoginForm";

const LoginPage = () => {
    return(
        <PageLayout>
            <LoginForm />
        </PageLayout>
    );
}

export default LoginPage;
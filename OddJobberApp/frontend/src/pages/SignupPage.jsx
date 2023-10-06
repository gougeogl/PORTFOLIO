/******************************************************
 ◘ filename: SignupPage.jsx 
 ◘ Description: The OddJobber App Signup page
 ******************************************************/

// Custom Components
import PageLayout from "../layouts/PageLayout";
import SignupForm from "../components/AuthN/SignupForm";

const SignupPage = () => {
    return(
        <PageLayout>
            <SignupForm />
        </PageLayout>
    )
}

export default SignupPage;
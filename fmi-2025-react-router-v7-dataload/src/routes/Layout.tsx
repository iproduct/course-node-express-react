import { Outlet, useNavigation } from 'react-router';
import './Layout.css';
import LoadingIndicator from '../components/LoadingIndicator';
import Nav from '../components/Nav';


const Layout = () => {
    const navigation = useNavigation();
    return (
        <>
            <Nav />
            <main className="flex flex-col items-center gap-9">
                <Outlet />
                {navigation.state === "loading" && <LoadingIndicator />}
            </main>
        </>)
}

export default Layout;
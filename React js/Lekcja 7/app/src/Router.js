import { React, useEffect } from "react"; 
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useLocation
} from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import App01 from './App01';
import App02 from './App02';
import App03 from './App03';
import App04 from './App04';
import App05 from './App05';
import App06 from './App06';
import App07 from './App07';
import App08 from './App08';
import './router.css';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoutersList />}>
                    <Route path="App01" element={<App01 />} />
                    <Route path="App02" element={<App02 />} />
                    <Route path="App03" element={<App03 />} />
                    <Route path="App04" element={<App04 />} />
                    <Route path="App05" element={<App05 />} />
                    <Route path="App06" element={<App06 />} />
                    <Route path="App07" element={<App07 />} />
                    <Route path="App08" element={<App08 />} />
                    <Route path="*" element={<h1>Brak Strony</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const RoutersList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Przekierowanie na /App01 po wejściu na /
    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/App01");
        }
    }, [location.pathname, navigate]);
    return (
        <>

            <nav className="bottomNav">
                <ul className="bottomNavList">
                    <li>
                        <LinkBtn name="App01" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App02" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App03" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App04" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App05" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App06" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App07" location={location} />
                    </li>
                    <li>
                        <LinkBtn name="App08" location={location} />
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

const LinkBtn = ({ name, location }) => {
    let path = "/" + name
    return (<Link to={path} className={"link" + ((location.pathname.startsWith(path)) ? " linkActive" : "")}>{name}</Link>)
}

export default AppRouter;
import { createHashRouter } from 'react-router-dom';
import FrontLayout from '../layouts/FrontLayout';
import IndexPage from '../pages/indexPage/IndexPage';
import NotFound from '../pages/NotFound';
import UserPages from '../pages/userPages/UserPages';
import AboutUsPage from '../pages/AboutusPage/AboutusPage';
import MateriaPage from '../pages/MaterialPage/MaterialPage';
import QaPage from '../pages/QAPage/QaPage';
import EstimatePage from '../pages/EstimatePage/EstimatePage';
import TokenPage from '../pages/TokenPage/TokenPage';





const router = createHashRouter([ //createHashRouter為建立router的方法
	{
		path:"/",
		element: <FrontLayout />,
        children:[
            {
                path: "",
                element: <IndexPage />,
            },
            {
                path: "IndexPage",
                element: <IndexPage />,
            },
            {
                path: "EstimatePage",
                element: <EstimatePage />,
            },
            {
                path: "MateriaPage",
                element: <MateriaPage />,
            },
            {
                path: "QaPage",
                element: <QaPage />,
            },
            {
                path: "AboutUsPage",
                element: <AboutUsPage />,
            },
            {
                path: "UserPages",
                element: <UserPages />,
            },
            {
                path: "token",
                element: <TokenPage />,
            },
        ]
	},
    {
        path: "*",
        element: <NotFound />,
    }
])
export default router;
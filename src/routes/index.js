import RootRoutes from '../containers/RootContainers';
import MainRoutes from '../containers/MainContainers';
import VendorsRoutes from '../containers/VendorsContainers';
import SearchRoutes from '../containers/SearchContainers';
import FavoritesRoutes from '../containers/FavoritesContainers';


const routes = [
    {
        component: RootRoutes,
        routes: [
            {
                path: '/',
                exact: true,
                component: MainRoutes
            },
            {
                path: '/search',
                exact: true,
                component: SearchRoutes
            },
            {
                path: '/vendors',
                exact: true,
                component: VendorsRoutes
            },
            {
                path: '/favorites',
                component: FavoritesRoutes
            }
        ]
    }
];

export default routes;

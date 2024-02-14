import React from "react";
import { createBrowserRouter } from "react-router-dom";
import EditContact from "../pages/contact/form/EditContact";

const EditOppourtinity = React.lazy(()=> import("../pages/oppourtinity/form/edit-oppourtinity"))
const NotFound = React.lazy(()=> import( "../pages/not-found"));
const Login = React.lazy(()=> import( "../pages/login"));
const Loading = React.lazy(()=> import( "../pages/loading"));
const Home = React.lazy(()=> import("../pages/home"));
const Dashboard = React.lazy(()=> import( "../pages/dashboard"));

const Lead = React.lazy(()=> import( "../pages/lead"));
const EditLead = React.lazy(()=> import( "../pages/lead/edit"));
const Opprourtinity = React.lazy(()=> import( "../pages/oppourtinity"));
const Product = React.lazy(()=> import( "../pages/product"));
const ProductMapping = React.lazy(()=> import( "../pages/productmapping"));
const Task = React.lazy(()=> import( "../pages/task"));
const User = React.lazy(()=> import( "../pages/user"));
const Account = React.lazy(()=> import( "../pages/account"));
const EditAccount = React.lazy(()=> import( "../pages/account/form/EditAccount"));

const pages = [{key:'dashboard', value:Dashboard},{key:'lead', value:Lead}, {key:'opprourtinity', value:Opprourtinity},
                {key:'product', value:Product}, {key:'productmapping', value:ProductMapping}, {key:'task', value:Task},
                {key:'user', value: User}, {key:'lead/:id', value: EditLead}, {key:'opprourtinity/:id', value: EditOppourtinity}
                , {key:'account', value: Account}, {key:'account/:id', value: EditAccount}
                , {key:'contact/:id', value: EditContact}
                
            ];

const Wrap = (component)=> <React.Suspense fallback={<Loading/>}>{component}</React.Suspense>

const router = createBrowserRouter([
    {
        path:"",
        element: Wrap(<Login/>)
    },
    {
        path:"user",
        element: Wrap(<Home/>),
        children: pages.map(page=> {
            return {
                path:`${page.key}`,
                element: Wrap(<page.value/>)
            }
        })
    },
    {
        path:"*",
        element: Wrap(<NotFound/>)
    }
]);

export default router;
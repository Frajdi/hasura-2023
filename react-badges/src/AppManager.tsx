// import React from "react";

// import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";

// const AppManager: React.FC = () => (
//   <AppEntrypoint
//     icon={<ManagerIcon />}
//     title="Manager"
//     defaultRoute="dashboard"
//     routes={[
//       {
//         path: "dashboard",
//         element: <div>Manager</div>
//       }
//     ]}
//   />
// );

// export default AppManager;

import React from "react";
import { RouteProps } from "react-router-dom";

import {
  SupervisorAccount as ManagersIcon,
  Engineering as EngineersIcon,
  Security as ShieldIcon,
  
} from "@mui/icons-material";

import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import ManagerEngineer from "./views/backoffice/ManagerEngineer";

import { DrawerMenu } from "./layouts/BasicLayout";

const menuItems = [
  {
    link: "managers",
    text: "managers",
    icon: <ManagersIcon />
  },
  {
    link: "engineers",
    text: "Engineers",
    icon: <EngineersIcon />
  },
  {
    link: "badges",
    text: "Badges Definitions",
    icon: <ShieldIcon />
  }
];

const AppBackoffice: React.FC = () => (
  <AppEntrypoint
    icon={<BackofficeIcon />}
    title={"Backoffice"}
    defaultRoute="managers"
    drawerContents={[<DrawerMenu title="Backoffice:" items={menuItems} />]}
    mobileUtils={menuItems}
    routes={
      [
        {
          path: "managers",
          element: <ManagerEngineer />
        }
      ] as RouteProps[]
    }
  />
);

export default AppBackoffice;


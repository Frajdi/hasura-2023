import React from "react";
import { RouteProps } from "react-router-dom";
import {
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import Candidatures from "./views/manager/Candidatures";
import Engineers from "./views/manager/Engineers/Engineers";
import Badges from "./views/manager/Badges/Badges";
import Proposals from "./views/manager/Proposals";
import { DrawerMenu } from "./layouts/BasicLayout";
import ProposalForm from "./components/proposalComponents/ProposalForm";
import IssuingRequests from "./views/manager/IssuingRequests";

const menuItems = [
  {
    link: "badges",
    text: "Badges List",
    icon: <ShieldIcon />
  },
  {
    link: "engineers",
    text: "Engineers",
    icon: <EngineersIcon />
  },
  {
    link: "candidatures",
    text: "Candidatures List",
    icon: <ShieldIcon />
  },
  {
    link: "issues",
    text: "Issues List",
    icon: <ShieldIcon />
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title={"Manager"}
    defaultRoute="badges"
    drawerContents={[<DrawerMenu title="Manager:" items={menuItems} />]}
    mobileUtils={menuItems}
    routes={
      [
        {
          path: "badges",
          element: <Badges />
        },
        {
          path: "engineers",
          element: <Engineers />
        },
        {
          path: "candidatures",
          element: <Candidatures />
        },
        {
          path: "issues",
          element: <IssuingRequests />
        },
        {
          path: "proposals",
          element: <Proposals />
        },
        {
          path: "proposalform",
          element: <ProposalForm />
        }
      ] as RouteProps[]
    }
  />
);

export default AppManager;

import DashboardPage from './views/dashboard';
import ReleaseList from './views/releases';
import SettingsPage from './views/settings';
import TaskBoard from './views/task_board';

import {
  Dashboard,
  List,
  Settings,
  ViewWeek,
} from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Project Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/tasks",
    sidebarName: "Tasks",
    navbarName: "Task Board",
    icon: ViewWeek,
    component: TaskBoard
  },
  {
    path: "/releases",
    sidebarName: "Releases",
    navbarName: "Release List",
    icon: List,
    component: ReleaseList
  },
  {
    path: "/settings",
    sidebarName: "Settings",
    navbarName: "Project Global Settings",
    icon: Settings,
    component: SettingsPage
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;

import DashboardPage from './views/dashboard';
import ReleaseList from './views/releases';
import SettingsPage from './views/settings/settings';
import ProfilePage from './views/profile';
import HomePage from './views/home';
import TaskBoard from './views/task_board';

import {
  Dashboard,
  List,
  Settings,
  ViewWeek,
  Person,
  Home,
} from "@material-ui/icons";

export const dashboardRoutes = [
  {
    path: "/p/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Project Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/p/tasks",
    sidebarName: "Tasks",
    navbarName: "Task Board",
    icon: ViewWeek,
    component: TaskBoard
  },
  {
    path: "/p/releases",
    sidebarName: "Releases",
    navbarName: "Release List",
    icon: List,
    component: ReleaseList
  },
  {
    path: "/p/settings",
    sidebarName: "Settings",
    navbarName: "Project Global Settings",
    icon: Settings,
    component: SettingsPage
  }
];


export const mainRoutes = [
  {
    path: "/profile",
    sidebarName: "Profile",
    navbarName: "User Profile",
    icon: Person,
    component: ProfilePage
  },
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Callisto",
    icon: Home,
    component: HomePage
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];


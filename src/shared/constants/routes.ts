import { Counter } from '../../solutions/1/1.Create-a-Counter-Component';
import { ToggleSwitch } from '../../solutions/2/2.Implement-a-Toggle-Switch';
import { TodoList } from '../../solutions/3/3.Build-a-To-Do-List';
import { PostList } from '../../solutions/4/4.Fetch-Data-from-an-API';
import { SearchBar } from '../../solutions/5/5.Create-a-Search-Bar';
import { DropdownMenu } from '../../solutions/6/6.Build-a-Dropdown-Menu';
import { Tabs } from '../../solutions/7/7.Implement-a-Tabs-Component';

export const ROUTES = [
  {
    path: '/1',
    name: '1. Create a Counter Component',
    component: Counter,
  },
  {
    path: '/2',
    name: '2. Implement a Toggle Switch',
    component: ToggleSwitch,
  },
  {
    path: '/3',
    name: '3. Build a To-Do List',
    component: TodoList,
  },
  {
    path: '/4',
    name: '4. Fetch Data from an API',
    component: PostList,
  },
  {
    path: '/5',
    name: '5. Create a Search Bar',
    component: SearchBar,
  },
  {
    path: '/6',
    name: '6. Build a Dropdown Menu',
    component: DropdownMenu,
  },
  {
    path: '/7',
    name: '7. Implement a Tabs Component',
    component: Tabs,
  },
];

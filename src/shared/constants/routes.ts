// eslint-disable-next-line simple-import-sort/imports
import { Solution1 } from '../../solutions/1/Solution1';
import { Solution10 } from '../../solutions/10/Solution10';
import { Solution2 } from '../../solutions/2/Solution2';
import { Solution3 } from '../../solutions/3/Solution3';
import { Solution4 } from '../../solutions/4/Solution4';
import { Solution5 } from '../../solutions/5/Solution5';
import { Solution6 } from '../../solutions/6/Solution6';
import { Solution7 } from '../../solutions/7/Solution7';
import { Solution8 } from '../../solutions/8/Solution8';
import { Solution8_2 } from '../../solutions/8/Solution8-2';
import { Solution9 } from '../../solutions/9/Solution9';

export const ROUTES = [
  {
    path: '/1',
    name: '1. Create a Counter Component',
    component: Solution1,
  },
  {
    path: '/2',
    name: '2. Implement a Toggle Switch',
    component: Solution2,
  },
  {
    path: '/3',
    name: '3. Build a To-Do List',
    component: Solution3,
  },
  {
    path: '/4',
    name: '4. Fetch Data from an API',
    component: Solution4,
  },
  {
    path: '/5',
    name: '5. Create a Search Bar',
    component: Solution5,
  },
  {
    path: '/6',
    name: '6. Build a Dropdown Menu',
    component: Solution6,
  },
  {
    path: '/7',
    name: '7. Implement a Tabs Component',
    component: Solution7,
  },
  {
    path: '/8',
    name: '8. Create a Modal Component',
    component: Solution8,
  },
  {
    path: '/8-2',
    name: '8-2. Create a Modal Component 2',
    component: Solution8_2,
  },
  {
    path: '/9',
    name: '9. Build a Carousel Component',
    component: Solution9,
  },
  {
    path: '/10',
    name: '10. Implement a Star Rating Component',
    component: Solution10,
  },
];

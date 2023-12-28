import type { ComponentType } from 'react';
import type { Params } from 'react-router-dom';
import { Login, Dashboard, FetchData, Form,Quillboard, DndBoard, MantineVerse, LandsDMap } from 'src/containers';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';


export const TRANSITION_DEFAULT = {
  classNames: 'fade',
  timeout: { enter: 250, exit: 250 }
};

export type RouteComponent = ComponentType<any>;
export type Transition = typeof TRANSITION_DEFAULT;

export type Route = Readonly<{
  name: string;
  path: string;
  icon?: IconProp;
  showInNav?: boolean;
  transition: Transition;
  Component: RouteComponent;
  params?: Readonly<Params<string>>;
  iconIndex? : number;
  
}>;

export const Routes: Route[] = [
  {
    path: '/',
    icon: 'sign-out-alt',
    name: 'Logout',
    Component: Login,
    transition: TRANSITION_DEFAULT
  },

  {
    showInNav: true,
    path: '/home',
    name: 'Home',
    Component: Dashboard,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
  },
  {
    path: '/form',
    showInNav: true,
    name: 'Form',
    Component: Form,
    transition: {
      classNames: 'page-slide-left',
      timeout: { enter: 350, exit: 250 }
    },
    iconIndex: 1,
  },
  {
    showInNav: true,
    path: '/dnd',
    name: 'Drag and Drop',
    Component: DndBoard,
    transition: TRANSITION_DEFAULT,
    iconIndex: 2,
  },    
  {
    showInNav: true,
    path: '/quill',
    name: 'Quill',
    Component: Quillboard,
    transition: TRANSITION_DEFAULT,
    iconIndex:3,
  },  
  {
    showInNav: true,
    name: 'Fetch',
    path: '/fetch/:startDateIndex',
    Component: FetchData,
    transition: {
      classNames: 'page-slide-right',
      timeout: { enter: 350, exit: 250 }
    },
    params: {
      // this value set the location path parameter correctly
      startDateIndex: '0'
    },
    iconIndex:4,
  },
  {
    showInNav: true,
    name: 'Data Verse',
    path: '/verse/:startIndex',
    Component: MantineVerse,
    transition: TRANSITION_DEFAULT,
    params: {
      startIndex: '0'
    },
    iconIndex: 5

  },
  {
    showInNav: true,
    name: 'LandsD Map',
    path: '/map',
    Component: LandsDMap,
    transition: TRANSITION_DEFAULT,

    iconIndex: 6

  },

];
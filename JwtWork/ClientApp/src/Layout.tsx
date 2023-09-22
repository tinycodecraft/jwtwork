import { Footer, Navbar,FloatMenu } from 'src/fragments';
import { OpenMenuProvider} from './context/OpenMenuContext';

import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <Navbar />
    <OpenMenuProvider eventlist={['click','touchend']} sideAction='lostFocus'>
      <FloatMenu />
    </OpenMenuProvider>
    
    {children}
    <Footer />
  </Fragment>
);

export default Layout;
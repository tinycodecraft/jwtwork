import Layout from './Layout';
import { Routes as routes } from './config';
import type { FunctionComponent } from 'react';
import { useCSSTransitionProps } from 'src/utils';
import { useLocation, Route, Routes } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';


const App: FunctionComponent = () => {
  const location = useLocation();
  const cssProps = useCSSTransitionProps();
  

  return (
    <Layout>
      <SwitchTransition mode="out-in">
        <CSSTransition {...cssProps}>
          <Routes location={location}>
            {routes.map(({ path, Component, ...rest }) => (
              <Route
                key={path}
                path={path}   
                
                             
                element={<Component {...rest} />}
              />
            ))}
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </Layout>
  );
};

export default App;
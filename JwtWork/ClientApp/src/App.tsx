import Layout from './Layout';
import { Routes as routes } from './config';
import { useRef, type FunctionComponent, useState, forwardRef } from 'react';
import { useCSSTransitionProps } from 'src/utils';
import { useLocation, Route, Routes } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Dashboard } from './containers';




const App: FunctionComponent = () => {
  const location = useLocation();
  const cssProps = useCSSTransitionProps();
  const nodeRefs:any[]=[]
  const [refIndex,setRefIndex]=useState(0);

  return (
    <Layout>
      <SwitchTransition mode="out-in">
        <CSSTransition {...cssProps} nodeRef={nodeRefs[refIndex]}>
          <Routes location={location}>
            {routes.map(({ path, Component,name, ...rest },index) => {
              nodeRefs[index] = useRef(null)
              const ForwComponent =forwardRef<HTMLDivElement>((props,ref)=> (<div className='container' ref={ref}><Component {...props}  /></div>));
              ForwComponent.displayName = `${name}Forwarded`;
              return (<Route
                key={path}
                path={path}   
                action={async() => setRefIndex(index)}                             
                element={<ForwComponent ref={nodeRefs[index]} {...rest} />}
              />);
            })}

            {/* catch all  */}
            {(<Route path='*' element={<Dashboard />} />)}
          </Routes>
        </CSSTransition>
      </SwitchTransition>
    </Layout>
  );
};

export default App;
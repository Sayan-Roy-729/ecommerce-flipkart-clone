import React from 'react';

import Header from '../Header/Header';
import MenuHeader from '../MenuHeader/MenuHeader';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <MenuHeader />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;

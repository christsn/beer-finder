import "antd/dist/antd.css";
import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import history from './app/history'
import store from './app/store';
import huHU from 'antd/lib/locale/hu_HU'
import { PrivateRoutes } from './app/PrivateRoutes';
import { Content, Footer } from 'antd/lib/layout/layout';
import { Header } from './app/Header';
import styles from './App.module.css'

export const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={huHU}>
        <Provider store={store}>
          <Router history={history}>
            <React.StrictMode>
              <Layout className={styles.layout}>
                <Header />
                <Content className={styles.content}>
                  <PrivateRoutes />
                </Content>
                <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED - hihi, igen, nem írom át xd</Footer>
              </Layout>
            </React.StrictMode>
          </Router>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}
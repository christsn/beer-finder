import React, { useCallback } from 'react';
import { ReactComponent as Logo } from '../assets/beer-svgrepo-com.svg'
import { Button, Layout, Menu, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../features/login/loginSlice';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Header.module.css'

export const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { logout } = loginActions
  const { username } = useSelector(state => state.login)

  const handleLogout = useCallback(() => {
      localStorage.removeItem('username')
      dispatch(logout())
    }, [dispatch, logout]
  )

  const handleNavigation = useCallback(() => {
      history.push('/beers') 
    }, [history]
  )

  return (
    <Layout.Header className={styles.header}>
      <Logo className={styles.logo} />
      {username && 
        <>
          <Menu theme="dark" mode="horizontal" selectedKeys={location.pathname.endsWith("/beers") && ["beers"]} className={styles.menu}>
            <Menu.Item key="beers" onClick={handleNavigation}>
              Sörök
            </Menu.Item>
          </Menu>
          <div className={styles.authControl}>
            <Typography.Text className={styles.username}>{username}</Typography.Text>
            <Button type="primary" onClick={handleLogout}>Kijelentkezés</Button>
          </div>
        </> 
      }
    </Layout.Header>
)
}
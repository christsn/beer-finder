import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from './loginSlice'
import { Card, Typography, Form, Input, Button, Alert, Row, Col, Space } from 'antd'
import { useCommonFormRules } from '../../hooks/useCommonFormRules'
import { useHistory } from 'react-router-dom'
import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const rule = useCommonFormRules()
  const { loading, hasErrors } = useSelector((state) => state.login)
  const { login } = loginActions

  const handleLogin = useCallback(({username}) => {
    dispatch(login(username))
    history.push('/beers')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row justify="center" align="middle">
      <Col>
        <Card className={styles.content}>
          <Typography.Title level={4}>Bejelentkezés</Typography.Title>
          
          <Form
            name="login"
            layout="vertical"
            initialValues={{ username: '', password: '' }}
            onFinish={handleLogin}
          >
            <Form.Item
              label="Felhasználónév"
              name="username"
              rules={[
                rule.requiredString("Felhasználónév megadása kötelező"),
                rule.email()
              ]}
            >
              <Input maxLength={100} />
            </Form.Item>
            <Form.Item
              label="Jelszó"
              name="password"
              rules={[
                rule.requiredString("Jelszó megadása kötelező"),
              ]}
            >
              <Input.Password maxLength={100} />
            </Form.Item>
            <Space>
              <Button
                className="action-btn action-btn--main"
                loading={loading}
                size="large"
                type="primary"
                htmlType="submit"
              >
                Bejelentkezés
              </Button>
              {hasErrors && <Alert message="Sikertelen bejelentkezés. Próbálja meg újra!!!" type="error" />}
            </Space>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

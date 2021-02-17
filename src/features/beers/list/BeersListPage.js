import React, { useCallback, useMemo } from 'react'
import { Alert, Card, Col, Form, Input, InputNumber, Row, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { Waypoint } from 'react-waypoint'
import { useBeersListUtils } from './useBeersListUtils'
import styles from './BeersListPage.module.css'

export const BeersListPage = () => {
  const { handleSearchOnChange, handleNavigationToDetails, handleInfiniteScroll } = useBeersListUtils()
  const { beers, beersLoading, beersHaveErrors } = useSelector((state) => state.beers)

  const SearchBar = useCallback(() => (
    <Form
      name="login"
      layout="vertical"
      initialValues={{ beer_name: '', abv_gt: 0, abv_lt: 100 }}
      onValuesChange={handleSearchOnChange}
      className={styles.form}
    >
      <Row gutter={16}> 
        <Col span={6}>
          <Form.Item label="Név:" name="beer_name">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Alhokoltartam-tól:" name="abv_gt">
            <InputNumber className={styles.inputNumber} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Alkoholtartalom-ig:" name="abv_lt">
            <InputNumber className={styles.inputNumber} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [])
  
  const BeerItem = useCallback(({ beer }) => (
    <Card hoverable onClick={() => handleNavigationToDetails(beer.id)} className={styles.beerItem}>
      <img src={beer.image_url} alt={beer.name} className={styles.beerImage} />
      <p>{beer.name}</p>
      <p className={beer.abv > 5.5 ? styles.strongBeer : ""}>{beer.abv}%</p>
    </Card>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [])

  return (
    <>
      <SearchBar />
      <Row gutter={[16, 16]}>
        {beers.map(beer => <Col span={8} key={beer.id}><BeerItem beer={beer} /></Col>)}
      </Row>
      <Waypoint onEnter={handleInfiniteScroll} />
      {beersLoading && <Typography>Sörök töltése...</Typography>}
      {beersHaveErrors && <Alert severity="error">Nem tud söröket megjeleníteni :(</Alert>}
    </>
  )
}

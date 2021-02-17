import { Alert, Card, Col, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { beersActions } from '../beersSlice'
import styles from './BeerDetailsPage.module.css'

export const BeerDetailsPage = ({ match }) => {
  const dispatch = useDispatch()
  const { beer, beerLoading, beerHasErrors } = useSelector((state) => state.beers)
  const { getBeerById } = beersActions

  useEffect(() => {
    const { id } = match.params
    dispatch(getBeerById(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match])

  if (beerLoading) return <Typography>Sörike töltődik...</Typography>
  if (beerHasErrors) return <Alert severity="error">Nem tudjuk megjeleníteni a sörikét :(</Alert>

  return (
    <Row justify="center" align="middle">
      <Col>
        <Card className={styles.card}>
          <img src={beer.image_url} alt={beer.name} className={styles.image} />
          <p>{beer.name}</p>
          <p>{beer.description}</p>
          <p>{beer.abv}%</p>
          <ul>{beer.food_pairing.map(foodPair => <li key={foodPair}>{foodPair}</li>)}</ul>
        </Card>
      </Col>
    </Row>
    
  )
}
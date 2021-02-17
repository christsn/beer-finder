import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'
import { LoginPage } from '../features/login/LoginPage'
import { BeersListPage } from '../features/beers/list/BeersListPage'
import { BeerDetailsPage } from '../features/beers/details/BeerDetailsPage'

export const PrivateRoutes = () => {
  const { username } = useSelector((state) => state.login)
  if (username) {
    return (
      <Switch>
        <Route exact path="/" component={BeersListPage}/>
        <Route exact path="/beers" component={BeersListPage} />
        <Route exact path="/beers/:id" component={BeerDetailsPage} />
        <Route exact path="*" component={() => <Redirect to="/beers" />} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="*" component={() => <Redirect to="/login" />} />
      </Switch>
    )
  }
}

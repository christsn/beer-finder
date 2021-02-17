import { createSlice } from '@reduxjs/toolkit'

const pageSize = 9

export const beersSlice = createSlice({
  name: 'beers',
  initialState: {
    beers: [],
    beersLoading: false,
    beersHaveErrors: false,
    infinite: {
      queryString: '',
      pageNumber: 1,
      hasMore: true
    },
    beer: { food_pairing: [] },
    beerLoading: false,
    beerHasErrors: false
  },
  reducers: {
    getNewRequest: state => {
      state.beers = []
      state.beersLoading = true
      state.infinite.queryString = ''
      state.infinite.pageNumber = 1
    },
    getNewSuccess: (state, { payload }) => {
      state.beers = payload.beers
      state.beersLoading = false
      state.beersHaveErrors = false
      state.infinite.queryString = payload.queryString
      state.infinite.pageNumber += 1
      state.infinite.hasMore = payload.beers.length === pageSize
    },
    getMoreRequest: state => {
      state.beersLoading = true
    },
    getMoreSuccess: (state, { payload }) => {
      state.beers = [...state.beers, ...payload.beers]
      state.beersLoading = false
      state.beersHaveErrors = false
      state.infinite.pageNumber += 1
      state.infinite.hasMore = payload.beers.length === pageSize
    },
    getRequestFailure: state => {
      state.beersLoading = false
      state.beersHaveErrors = true
      state.infinite.hasMore = false
    },
    getBeer: state => {
      state.beerLoading = true
    },
    getBeerSuccess: (state, { payload }) => {
      state.beer = payload
      state.beerLoading = false
      state.beerHasErrors = false
    },
    getBeerFailure: state => {
      state.beerLoading = false
      state.beerHasErrors = true
    }
  }
})

export const { 
  getNewRequest, 
  getNewSuccess, 
  getMoreRequest, 
  getMoreSuccess, 
  getRequestFailure,
  getBeer, 
  getBeerSuccess, 
  getBeerFailure
 } = beersSlice.actions

const createQueryString = (queryData) => {
  const queryParams = []

  Object.entries(queryData).forEach(
    ([key, value]) => value && queryParams.push(`&${key}=${value}`)
  )

  return queryParams.join('')
}

function fetchNewBeers (queryData) {
  return async dispatch => {
    dispatch(getNewRequest())

    try {
      const queryString = createQueryString(queryData)
      const requestUrl = `https://api.punkapi.com/v2/beers?per_page=${pageSize}&page=1${queryString}`
      const response = await fetch(requestUrl)
      const beers = await response.json()
      dispatch(getNewSuccess({ beers, queryString }))
    } catch (error) {
      dispatch(getRequestFailure())
    }
  }
}

function fetchMoreBeers () {
  return async (dispatch, getState) => {
    dispatch(getMoreRequest())

    const { infinite } = getState().beers

    try {
      const requestUrl = `https://api.punkapi.com/v2/beers?per_page=${pageSize}&page=${infinite.pageNumber}${infinite.queryString}`
      const response = await fetch(requestUrl)
      const beers = await response.json()
      dispatch(getMoreSuccess({ beers }))
    } catch (error) {
      dispatch(getRequestFailure())
    }
  }
}

function getBeerById(id) {
  return async dispatch => {
    dispatch(getBeer())

    try {
      const requestUrl = `https://api.punkapi.com/v2/beers/${id}`
      const response = await fetch(requestUrl)
      const [beer] = await response.json()
      dispatch(getBeerSuccess(beer))
    } catch (error) {
      dispatch(getBeerFailure())
    }
  }
}

export const beersActions = {
  fetchNewBeers,
  fetchMoreBeers,
  getBeerById
}

export const beersReducer = beersSlice.reducer

import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { beersActions } from '../beersSlice'

export const useBeersListUtils = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { beers, beersLoading, infinite } = useSelector((state) => state.beers)
  const { fetchNewBeers, fetchMoreBeers } = beersActions
  const [timeOutId, setTimeOutId] = useState()

  const handleSearchOnChange = useCallback((changedValues, allValues) => {
      clearTimeout(timeOutId)
      setTimeOutId(setTimeout(() => !beersLoading && dispatch(fetchNewBeers(allValues)), 600));
    }, [beersLoading, dispatch, fetchNewBeers, timeOutId]
)

  const handleInfiniteScroll = useCallback(() => {
      beers.length && !beersLoading && infinite.hasMore && dispatch(fetchMoreBeers())
    }, [beers.length, beersLoading, dispatch, fetchMoreBeers, infinite.hasMore]
  )

  const handleNavigationToDetails = useCallback((id) => {
      history.push(`/beers/${id}`)
    }, [history]
  )

  return {
    handleSearchOnChange,
    handleInfiniteScroll,
    handleNavigationToDetails,
  }
}
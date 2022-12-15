import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { matchRoutes, useLocation } from "react-router-dom"
import { useMemo } from 'react'
import { selectCurrentUser } from './services/auth.service';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




// const routes = [{ path: "/members/:id" }]

// export const useCurrentPath = () => {
//     const location = useLocation()

//     const xxx = matchRoutes(routes, location);
//     debugger
//     // @ts-ignore
//     const [{ route }] = matchRoutes(routes, location)

//     debugger
//     return route.path
// }



export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return user;
}
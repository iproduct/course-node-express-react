/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { createSlice, type PayloadAction, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';

import { type Credentials, type LoggedUser } from '../../model/auth';
import type { IUser } from '../../model/user.model';
import AuthService from '../../service/auth-service';
import { getErrorMessage } from '../../service/service-utils';
import type { NavigateFunction } from 'react-router';
import type { RootState } from '../../app/rootReducer';

interface AuthState {
  loggedUser: IUser | undefined;
  token: string | undefined;
  loading: boolean;
  error: string | undefined;
  requestedUrl: string | undefined;
}

const loggedUserStr = localStorage.getItem('loggedUser');
let loggedUser: LoggedUser | null = null;
if (loggedUserStr) {
  loggedUser = JSON.parse(loggedUserStr) as LoggedUser;
}
console.log(`Restoring logged user: ${loggedUser}`);

const initialState: AuthState = {
  loggedUser: loggedUser?.user,
  token: loggedUser?.token,
  loading: false,
  error: undefined,
  requestedUrl: undefined,
}


const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestedProtectedResource(state, action: PayloadAction<string>) {
      state.requestedUrl = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    loginSuccess(state, action: PayloadAction<LoggedUser>) {
      state.loggedUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = undefined;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  }
})

export const {
  requestedProtectedResource,
  loginStart,
  loginSuccess,
  loginFailure,
} = auth.actions
export default auth.reducer

export const submitLogin = (credentials: Credentials, navigate: NavigateFunction): ThunkAction<void, RootState, unknown, UnknownAction>  => async (dispatch, getState) => {
  try {
    dispatch(loginStart())
    const loggedUser = await AuthService.login(credentials);
    dispatch(loginSuccess(loggedUser));
    const requestedUrl = getState().auth.requestedUrl;
    // replace in history the Login with requested protected page ang go to it OR go to / if no requested page
    navigate(requestedUrl? requestedUrl: '/'); 
  } catch (err) {
    dispatch(loginFailure(getErrorMessage(err)))
  }
}




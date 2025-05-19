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

import type { Credentials, LoggedUser } from '../model/auth';
import { Role } from '../model/user.model';
// import { Role, User } from '../model/user.model';
// import { handleErrorStausCodes } from './service-utils';

export const API_BASE = 'http://localhost:8080/api';

class AuthService {
    constructor(private apiUrl: string) {}

    async login(credentials: Credentials): Promise<LoggedUser> {
        // const resp = await fetch(`${this.apiUrl}/auth/login`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(credentials),
        // });
        // return handleErrorStausCodes<LoggedUser>(resp);
        return {
            user:{
                "firstName": "Trayan",
                "lastName": "Iliev",
                "username": "admin@gmail.com",                
                "email": "admin@gmail.com",
                "password": "admin123",
                "imageUrl": "https://avatars2.githubusercontent.com/u/8014435?s=460&u=b71421722a561314935ee12ff33d49ecd0518045&v=4",
                "roles": [Role.ADMIN],
                "id": "5f8079fb3173be7c6c59db1e"
              }, 
            token: "123456789"
        }
    }

}



export default new AuthService(API_BASE);

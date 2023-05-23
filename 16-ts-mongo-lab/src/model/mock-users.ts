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

import { Role, User, IUser } from "./user.model"
const MOCK_USERS = [
{
    "firstName": "Trayan",
    "lastName": "Iliev",
    "username": "trayan",
    "email": "t_iliev@fmi.uni-sofia.bg",
    "password": "$2a$10$GVX82cfYHdo3ebD.8./Fsuwa6YroQM2VKfJpkTg9yGbpoIHuugOiS",
    "imageUrl": "https://avatars2.githubusercontent.com/u/8014435?s=460&u=b71421722a561314935ee12ff33d49ecd0518045&v=4",
    "roles": [Role.ADMIN]
},
{
    "firstName": "Georgi",
    "lastName": "Petrov",
    "username": "georgi",
    "email": "george123@gmail.com",
    "password": "$2a$10$GVX82cfYHdo3ebD.8./Fsuwa6YroQM2VKfJpkTg9yGbpoIHuugOiS",
    "imageUrl": "https://avatars2.githubusercontent.com/u/8014435?s=460&u=b71421722a561314935ee12ff33d49ecd0518045&v=4",
    "roles": [Role.READER, Role.AUTHOR]
},

] as IUser[];

export default MOCK_USERS;
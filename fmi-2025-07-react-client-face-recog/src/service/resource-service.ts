
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
import { Resource } from '../model/resource.model';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

export const WS_URL = 'ws://localhost:8080/event-emitter';

class PictureService {
    private socketSubject: WebSocketSubject<Resource>;
    constructor(private apiUrl: string) {
        this.socketSubject = webSocket(apiUrl);
        this.socketSubject.subscribe(
            msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
            err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            () => console.log('complete') // Called when connection is closed (for whatever reason).
        );

        // // Connection opened
        // this.socket.addEventListener('open', (event) => {
        //     this.socket.send('Hello Server!');
        // });

        // // Listen for messages
        // this.socket.addEventListener('message', (event) => {
        //     console.log('Message from server ', event.data);
        // });
    }

    get  wsSubject() {
        return this.socketSubject.pipe(
            map(obj => JSON.stringify(obj)),
            catchError(err => of(JSON.stringify(err)))
        ) as Observable<string>;
    }

    sendResource(resource: Resource) {
        this.socketSubject.next(resource);
    }

}



export default new PictureService(WS_URL);

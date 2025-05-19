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

import { AppError } from "../model/errors";

export async function handleErrorStausCodes<T>(resp: Response): Promise<T> {
    if (resp.status < 400) {
        const entity = await resp.json();
        return entity as T;
    } else {
        const err = await resp.json() as AppError;
        throw err;
    }
}


// error message utils
interface ValidationError {
    message: string;
    validation: string,
    field: string;
}


interface ValidationErrors {
    message: string;
    error: ValidationError[];
    status?: number;
}

export function getErrorMessage(err: any) {
    if (err.message) {
        return err.message as string;
    } else if (err.error) {
        const error = err as ValidationErrors;
        return error.error.map(e => e.message).join('. ');
    } else {
        return JSON.stringify(err);
    }
}
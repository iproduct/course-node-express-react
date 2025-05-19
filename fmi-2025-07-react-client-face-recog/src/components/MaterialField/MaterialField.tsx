/* eslint-disable @typescript-eslint/no-unused-vars */
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

import TextField from '@mui/material/TextField';
import { connect, Field, type FieldProps } from 'formik';

interface MaterialFiledProps {
    name: string;
    label: string
    rowsMax?: number;
}

function MaterialFiled({ name, label, rowsMax = 1 }: MaterialFiledProps) {
    return (
        <Field name={name}>
            {({
                field, // { name, value, onChange, onBlur }
                //form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
            }: FieldProps) => (
                    <TextField
                        id={name}
                        helperText={meta.touched ? meta.error : ""}
                        error={meta.touched && Boolean(meta.error)}
                        label={label}
                        fullWidth
                        multiline={rowsMax > 1}
                        maxRows={rowsMax}
                        {...field}
                    />
                )
            }
        </Field>
    );
};

const MaterialField = connect<MaterialFiledProps>(MaterialFiled);

export default MaterialField;
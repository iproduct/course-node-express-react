/* eslint-disable @typescript-eslint/no-explicit-any */
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

import * as React from 'react';
import Header from '../Header/Header';
import { Button, Grid, Icon } from '@mui/material';
// import { PictureItem } from '../PictureItem/PictureItem';
import { Resource, ResourceFormat, ResourceType } from '../../model/resource.model';
import './FaceRecognition.css';
import PictureService from '../../service/resource-service';
import { connect } from 'react-redux'
import { showError, showMessage } from '../../features/resources/resourcesSlice';

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    showMessage: (message: string) => {
      dispatch(showMessage(message))
    },
    showError: (error: string) => {
      dispatch(showError(error))
    }

  }
}

interface Props {
  showMessage: (message: string) => void;
  showError: (message: string) => void;
}

class FaceRecognitionComponent extends React.Component<Props> {
  viewportWidth = 120;
  viewportHeight = 120;
  pictureWidth = 720;
  pictureHeight = 720;
  resourceType = ResourceType.IMAGE_JPEG;
  pictureQuality = 0.92;

  isMediaFound: boolean = true;
  error: string | undefined = undefined;

  imageViewWidth = 120;
  imageViewHeight = 120;

  resorceList: Resource[] = [];
  selectedResource: Resource | null = null;

  playerRef: React.RefObject<HTMLVideoElement | null> = React.createRef<HTMLVideoElement>();
  canvasRef: React.RefObject<HTMLCanvasElement | null> = React.createRef<HTMLCanvasElement>();
  player: HTMLVideoElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(props: Props) {
    super(props)

    // this.state = {

    // }

    this.captureImage = this.captureImage.bind(this);
  }

  componentDidMount() {
    const constraints = {
      video: {
        width: this.pictureWidth,
        height: this.pictureHeight,
        facingMode: 'environment'
      }
    };

    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      console.log(stream);
      this.player = this.playerRef.current;
      if (this.player) {
        this.player.srcObject = stream;
      }
      this.canvas = this.canvasRef.current;
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        this.isMediaFound = true;
      }
    }).catch(err => {
      this.isMediaFound = false;
      let error = 'Warning: No camera found.';
      if (err && err.constraint) {
        error += ", constraint: " + err.constraint;
      }
      this.showError(error);
    });
    // if (window.DeviceMotionEvent) {
    //   this.listenerFn = this.renderer.listen(window, 'devicemotion', this.accelerometerUpdate.bind(this));
    // } else {
    //     this.showError('Warning: No accelerometer found.');
    // }

    PictureService.wsSubject.subscribe(
      message => {
        this.props.showMessage(message);
      },
      error => {
        this.props.showError(error);
      },
      () => {
        this.props.showMessage("Event stream completed.");
      });
  }

  captureImage() {
    if (!this.player || !this.canvas || !this.ctx) return;
    // Set canvas size
    const pictureAspect = this.player.videoWidth / this.player.videoHeight;
    this.imageViewWidth = this.viewportHeight * pictureAspect;
    this.imageViewHeight = this.viewportHeight;

    // Draw the video frame to the canvas.
    this.canvas.width = this.player.videoWidth;
    this.canvas.height = this.player.videoHeight;
    this.ctx.drawImage(this.player, 0, 0);

    // Convert canvas image to DataURL
    const dataUri = this.canvas.toDataURL(ResourceFormat[this.resourceType], this.pictureQuality);

    // Get byte data and MIME type
    const data = dataUri.split(',')[1];
    // const mimeType = dataUri.split(';')[0].slice(5);

    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const arr = new Uint8Array(buf);

    for (let i = 0; i < bytes.length; i++) {
      arr[i] = bytes.charCodeAt(i);
    }

    // const blob = new Blob([arr], { type: mimeType });
    this.resorceList.push(new Resource(dataUri, ResourceFormat[this.resourceType], this.canvas.width, this.canvas.height ));
    PictureService.sendResource(new Resource(dataUri, ResourceFormat[this.resourceType], this.canvas.width, this.canvas.height));
  }

  showError(errStr: string): void {
    this.error = this.error ? this.error + " " + errStr : errStr;
    setTimeout(() => { this.error = undefined }, 10000); //hide error after 10 seconds
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Grid container spacing={2}>
          {this.error && (<div className="error row">
            { this.error}
          </div>)}
          {this.isMediaFound && (<div>
            <video ref={this.playerRef} id="player" autoPlay={true} width={this.viewportWidth} height="this.viewportHeight"></video>
            <div className="buttons row">
              <Button variant="contained" color="primary" onClick={this.captureImage}
                endIcon={<Icon>settings_backup_restore</Icon>}>
                Capture Picture
              </Button>
            </div>
            <canvas ref={this.canvasRef} id="canvas"></canvas>
          </div>)}
        </Grid>
      </React.Fragment >
    )
  }
}

export const FaceRecognition = connect(() => ({ }), mapDispatchToProps)(FaceRecognitionComponent)

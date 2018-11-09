import React from "react"
import Webcam from "react-webcam"
import { IconButton } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

class Camera extends React.Component {
    constructor() {
        super()
        this.state = {
            camera: false,
            image: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.capture = this.capture.bind(this)
        this.setRef = this.setRef.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.image && this.props.image) {
            this.setState({ image: this.props.image, camera: true })
        }
    }

    handleClick() {
        //check if user wants to take photo, or reset for a re-take
        if (this.state.image.length > 0) this.setState({ image: '' })
        else if (this.state.camera) this.capture()
        else this.setState({ camera: true })
    }

    setRef(webcam) {
        this.webcam = webcam;
    }

    capture() {
        const image = this.webcam.getScreenshot()
        this.setState({ image })
        this.props.setImage(image)
    }

    render() {
        const cameraStyles = {
            overflow: 'hidden',
            borderRadius: 500,
            height: 230,
            width: 230,
        }

        return (
            <IconButton onClick={this.handleClick}>
                {
                    this.state.camera 
                        ?   <div style={cameraStyles}>
                            {
                                this.state.image.length > 0 
                                    ? <img style={{ marginTop: '-30px', marginLeft: '-200px' }} src={this.state.image} />           
                                    : <Webcam audio={false} style={{ marginTop: '-90px', marginLeft: '-200px' }}
                                        ref={this.setRef} screenshotFormat="image/png" />
                            }
                            </div>
                        : <AccountCircle style={{ fontSize: 230 }} />
                }
            </IconButton>
        )
    }
}

export default Camera
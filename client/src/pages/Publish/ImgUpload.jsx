import React from 'react';
import { connect } from 'react-redux';
import ReactCrop from 'react-image-crop';
import Resizer from 'react-image-file-resizer';
import 'react-image-crop/dist/ReactCrop.css';
import '../../App.css';


class ImgUpload extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
            crop: {
                unit: '%',
                aspect: 3 / 4,
                width: 50
            },
            src: null,
            croppedImageUrl: '',
            cropUrl: null,
            file: null,
            dimensions: {
                height: 0,
                width: 0
            },
            warning: ''
        };
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            var fileName, fileExtension;
            fileName = e.target.files[0].name;
            fileExtension = fileName.replace(/^.*\./, '');
            if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
                this.readImageFile(e.target.files[0]);
                Resizer.imageFileResizer(
                    e.target.files[0],
                    450,
                    600,
                    'JPEG',
                    100,
                    0,
                    uri => { this.setState({src: uri}); },
                    'base64'
                );
                this.setState({file: e.target.files[0]});
                this.setState({cropUrl: null});
            } else {this.setState({warning: 'Slika mora biti formata jpg, jpeg ali png!'})}
        }
    };

    readImageFile = (file) => {
        const reader = new FileReader();
        let w;
        let h;
        var self = this;
        reader.onload = function (e) {
            let img = new Image();      
            img.src = e.target.result;
            img.onload = function () {
                w = this.width;
                h = this.height;
                if (w < 450 || h < 600) {
                    self.setState({warning: 'Premajhna slika. Minimalna veikost slike je 450x600 px.'});
                } else self.setState({warning: ''});
            }
        };
        reader.readAsDataURL(file);
    }

    onImageLoaded = image => {
        this.imageRef = image;
        this.setState({dimensions:{height:image.offsetHeight,
            width:image.offsetWidth}});
    };
    
    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };
    
    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        //this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error('Canvas is empty');
                return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    saveCrop = () => {
        if(this.state.warning === '') {
            this.setState({cropUrl: this.state.croppedImageUrl, src: '', croppedImageUrl: ''});
            const photo = {file: this.state.file, crop: this.state.crop};
            this.props.callBackParent(photo, parseInt(this.props.index));
        }
    }

    render() {

        const { crop, src } = this.state;
        return (
            <>
                <div className="chosen_photos">
                    <input id="input1" type="file" onChange={this.onSelectFile} />
                    <br/>
                    <br/>
                </div>
                <div>
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                    <p style={{ color: 'red' }}>{this.state.warning}</p>
                    {(!this.state.cropUrl && src) && <button id='1' className = 'btnb' onClick={this.saveCrop}>SHRANI SLIKO</button>}
                    {this.state.cropUrl && <img alt="Crop1" style={{ width: '200px' }} src={this.state.cropUrl}/>}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
      loggedInUserId: state.loggedInUserId
    };
  };

export default connect(mapStateToProps) (ImgUpload);

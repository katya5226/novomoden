import React from 'react';
import Popup from 'reactjs-popup';
import { FaRegWindowClose } from 'react-icons/fa';
import ItemDescription from './ItemDescription';
import * as Constants from '../../constants';
import '../../App.css';

class Item extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            adId: '',
            status: '',
            seller: '',
            sellerId: '',
            photos: [],
            origPhotos: [],
            selection: {
                category: { value: '', label: 'Izberi kategorijo' },
                women: { value: '', label: 'Izberi kategorijo' },
                men: { value: '', label: 'izberi kategorijo' },
                kids: { value: '', label: 'Izberi kategorijo' },
                clothsize: { value: '', label: 'Izberi velikost' },
                material: { value: '', label: 'Izberi material' },
                condition: { value: '', label: 'Izberi stanje' },
                brand: {value: '', status: false},
                descrtext: {value: '', status: false},
                weight: {value: 0, status: false},
                price: {value: 0, status: false}
            },
            focused: -1
        };

    }
    abortController = new AbortController();
    
    componentWillUnmount() {
        this.abortController.abort();
    }

    fillTheForm = (receivedObject) => {

        const receivedValues = Object.values(receivedObject);
        
        this.setState({
            adId: this.props.adId,
            status: receivedValues[16],
            seller: receivedValues[12],
            sellerId: receivedValues[17],
            photos: [receivedValues[9], receivedValues[10], receivedValues[11]],
            origPhotos: [receivedValues[13], receivedValues[14], receivedValues[15]],
            selection: {
                category: Constants.category[receivedValues[0]],
                women: Constants.women[receivedValues[1]],
                men: Constants.men[receivedValues[1]],
                kids: Constants.kids[receivedValues[1]],
                clothsize: Constants.clothsize[receivedValues[2]],
                material: Constants.material[receivedValues[3]],
                condition: Constants.condition[receivedValues[4]],
                brand: {value: receivedValues[5], status: true},
                descrtext: {value: receivedValues[6], status: true},
                weight: {value: receivedValues[7], status: true},
                price: {value: receivedValues[8], status: true}
            }
        });

    }

    componentDidMount() {

        if(this.props.adId !== '') {
            fetch('/api/fillform', {
                signal: this.abortController.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({adId: this.props.adId})
            }).then(res => res.json())
                .then(res => {this.fillTheForm(res[0])})
                .catch(e => console.error("Critical failure: " + e.message));
        }
    }
    //<Slider useImages = 'true' slides={['image-1', 'image-2', 'image-3']} adId = {this.props.adId} photos = {this.state.photos} origPhotos = {this.state.origPhotos}/>

    closeModal = () => {
        this.setState({focused: -1});
    }

    render() {

        const iconStyle = {
            position: 'absolute',
            border: 'none',
            backgroundColor: 'rgb(255, 255, 255, 0)',
            verticalAlign: 'middle'
        }

        if (this.state.photos.length === 0) return <div></div>
        if(this.state.focused !== -1) {
            return (
                <Popup open = {true}
                    position = 'center center'
                    onClose={this.closeModal}>
                    <div style = {{height:"99vh"}}>
                        <img src = {'/api/' + this.state.origPhotos[this.state.focused]}
                            alt = {this.state.origPhotos[this.state.focused] + '_photo'}
                            style = {{maxWidth: '100%', height:'100%', margin: '0 auto'}}/>
                        <button type = 'button' style = {iconStyle} onClick = {this.closeModal}>
                            <FaRegWindowClose size = '2em'/>
                        </button>
                    </div>
                </Popup>
            )
        }       
        else return(
            <div className="itemDesc">
                <div className = 'imgSlider'>
                    <img src={'/api/' + this.state.origPhotos[0]}
                        alt = {this.state.origPhotos[0] + '_photo'}
                        onClick={() => this.setState({focused: 0})}/>
                    <img src={'/api/' + this.state.origPhotos[1]}
                        alt = {this.state.origPhotos[1] + '_photo'}
                        onClick={() => this.setState({focused: 1})}/>
                    <img src={'/api/' + this.state.origPhotos[2]}
                        alt = {this.state.origPhotos[2] + '_photo'}
                        onClick={() => this.setState({focused: 2})}/>
                </div>
                <ItemDescription selection = {this.state.selection}
                                seller = {this.state.seller}
                                sellerId = {this.state.sellerId}
                                adId = {this.props.adId}
                                status = {this.state.status}
                                itemAdded = {this.props.itemAdded}/>
            </div>
        )
    }
}

export default Item;
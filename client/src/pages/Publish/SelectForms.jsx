import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import '../../App.css';
import * as Constants from '../../constants';
import {findIndex} from '../../functions/index';



class SelectForms extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            category: { value: '', label: 'Izberi kategorijo' },
            women: { value: '', label: 'Izberi kategorijo' },
            men: { value: '', label: 'izberi kategorijo' },
            kids: { value: '', label: 'Izberi kategorijo' },
            clothsize: { value: '', label: 'Izberi velikost' },
            material: { value: '', label: 'Izberi material' },
            condition: { value: '', label: 'Izberi stanje' },
            brand: {value: '', status: false},
            descrtext: {value: '', status: false},
            weight: {value: null, status: false},
            price: {value: null, status: false}
        };
    }

    abortController = new AbortController();

    fillTheForm = (receivedObject) => {
        const receivedValues = Object.values(receivedObject);
        this.setState({category: Constants.category[receivedValues[0]],
                        women: Constants.women[receivedValues[1]],
                        men: Constants.men[receivedValues[1]],
                        kids: Constants.kids[receivedValues[1]],
                        clothsize: Constants.clothsize[receivedValues[2]],
                        material: Constants.material[receivedValues[3]],
                        condition: Constants.condition[receivedValues[4]],
                        brand: {value: receivedValues[5], status: true},
                        descrtext: {value: receivedValues[6], status: true},
                        weight: {value: receivedValues[7], status: true},
                        price: {value: receivedValues[8], status: true}});
    }

    componentDidMount() {
        const adId = this.props.adId;
        if(adId !== '') {
            fetch('/api/fillform', {
                signal: this.abortController.signal,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({adId: adId})
            }).then(res => res.json())
                .then(res => {this.fillTheForm(res[0])})
                .catch(e => console.error("Critical failure: " + e.message));
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
   
    changeCategory = selected => {
        this.setState({category: selected,
                        women: { value: '', label: 'Izberi kategorijo' },
                        men: { value: '', label: 'izberi kategorijo' },
                        kids: { value: '', label: 'Izberi kategorijo' }},
                        () => this.saveSelection);
    }
    changeWomen = selected => {
        this.setState({women: selected}, () => this.saveSelection());
    }
    changeMen = selected => {
        this.setState({men: selected}, () => this.saveSelection());
    }
    changeKids = selected => {
        this.setState({kids: selected}, () => this.saveSelection());
    }
    changeSize = selected => {
        this.setState({clothsize: selected}, () => this.saveSelection());
    }
    changeMaterial = selected => {
        this.setState({material: selected}, () => this.saveSelection());
    }
    changeCondition = selected => {
        this.setState({condition: selected}, () => this.saveSelection());
    }
    changeBrand = (event) => {
        const {value} = event.target;
        this.setState({brand: {value: value, status: true}}, () => this.saveSelection());
    }

    changeWeight = (values) => {
        //const {formattedValue, value} = values;
        const {value} = values;
        if(value>0 && value<2000) {
            this.setState({weight: {value: value, status: true}}, () => this.saveSelection());
        }else {
            this.setState({weight: {value: '', status: false}}, () => this.saveSelection());
        }
    }

    changePrice = (values) => {
        //const {formattedValue, value} = values;
        const {value} = values;
        if(value>0 && value<2000) {
            this.setState({price: {value: value, status: true}}, () => this.saveSelection());
        }else {
            this.setState({price: {value: '', status: false}}, () => this.saveSelection());
        }  
    }

    changeDescription = (event) => {
        const {value} = event.target;
        this.setState({descrtext: {value: value, status: true}}, () => this.saveSelection());
    }


    listFurther = () => {

        const warnWomenStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.women.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
        const warnMenStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.men.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
        const warnKidsStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.kids.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }

        switch(this.state.category.value) {
            case 'women':
                return <Select styles={warnWomenStyle} options={Constants.women} value={this.state.women} name='women' onChange={this.changeWomen}/>
            case 'men':
                    return  <Select styles={warnMenStyle} options={Constants.men} value={this.state.men} name='men' onChange={this.changeMen}/>
            case 'kids':
                return  <Select styles={warnKidsStyle} options={Constants.kids} value={this.state.kids} name='kids' onChange={this.changeKids}/>
            default:
                return null;
        }
    }

    render() {

        const warnCategoryStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.category.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
        const warnSizeStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.clothsize.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
        const warnMaterialStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.material.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
        const warnConditionStyle = {
            container: (provided) => ({
              ...provided,
              border: (this.state.condition.value==='' && this.props.saveAttempt===true) && '1px solid red',
              borderRadius: '4px'
            })
        }
    

        return (
            <>
                <div className="row">
                    <div className="column">
                        <Select
                            styles={warnCategoryStyle}
                            options={Constants.category}
                            value={this.state.category}
                            name='category'
                            onChange={this.changeCategory}/>
                        <br/>
                        {this.listFurther()}
                    </div>
                    <div className="column">
                        {this.state.category.value !== 'kids' && 
                        <Select
                            styles={warnSizeStyle}
                            options={Constants.clothsize}
                            value={this.state.clothsize}
                            name='clothsize'
                            onChange={this.changeSize}/>}
                        <br/>
                        <Select
                            styles={warnMaterialStyle}
                            options={Constants.material}
                            value={this.state.material}
                            name='material'
                            onChange={this.changeMaterial}/>
                        <br/>
                        <Select
                            styles={warnConditionStyle}
                            options={Constants.condition}
                            value={this.state.condition}
                            name='condition'
                            onChange={this.changeCondition}/>
                        <br/>
                        <input
                            type="text"
                            name='brand'
                            value={this.state.brand.value}
                            placeholder='Znamka oblačila (neobvezno)'
                            maxLength="30" onChange={this.changeBrand}/>
                        <br/><br/>
                        <NumberFormat
                            value={this.state.weight.value}
                            placeholder="Masa v gramih"
                            decimalSeparator={','}
                            allowLeadingZeros={false}
                            allowNegative={false}
                            suffix={' g'}
                            isNumericString={true}
                            onValueChange={this.changeWeight}
                            className ={(!this.state.weight.status && this.props.saveAttempt===true)  ? "red" : null}/>
                        <br/><br/>
                        <NumberFormat
                            value={this.state.price.value}
                            placeholder="Cena v evrih"
                            decimalSeparator={','}
                            allowLeadingZeros={false}
                            allowNegative={false}
                            suffix={' €'}
                            isNumericString={true}
                            onValueChange={this.changePrice}
                            className ={(!this.state.price.status && this.props.saveAttempt===true) ? "red" : null}/>
                    </div>
                    <div className="column">
                        <textarea
                            onChange={this.changeDescription}
                            value={this.state.descrtext.value}
                            placeholder="Opis (neobvezno)"
                            maxLength="990">
                        </textarea>
                    </div>
                </div>
            </>
        );

    }

    renderSwitch = (param) => {
        switch(param) {
            case 'women':
                return findIndex(Constants.women, this.state.women.label);
            case 'men':
                return findIndex(Constants.men, this.state.men.label);
            case 'kids':
                return findIndex(Constants.kids, this.state.kids.label);
            default:
                return '';
        }
    }

    subcategName = (param) => {
        switch(param) {
            case 'women':
                return this.state.women.label;
            case 'men':
                return this.state.men.label;
            case 'kids':
                return this.state.kids.label;
            default:
                return '';
        }
    }

    saveSelection = () => {
        const selection = {
            category: findIndex(Constants.category, this.state.category.label),
            subcategory: this.renderSwitch(this.state.category.value),
            subcategoryName: this.subcategName(this.state.category.value),
            clothsize: findIndex(Constants.clothsize, this.state.clothsize.label),
            material: findIndex(Constants.material, this.state.material.label),
            condition: findIndex(Constants.condition, this.state.condition.label),
            brand: this.state.brand.value,
            descrtext: this.state.descrtext.value,
            weight: this.state.weight.value,
            price: this.state.price.value
        }
        this.props.callBackParent(selection);
    }

}

const mapStateToProps = state => {
    return {
      saveAttempt: state.saveAttempt
    };
};


export default connect(mapStateToProps) (SelectForms);

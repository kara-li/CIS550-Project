import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;


const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  console.log(index);
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} %`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };

export default class Sliders extends React.Component {
    constructor(props) {
		super(props);
    }
    state = {
        sodiumQuery : `"1093" <= 3000 AND "1093" >= 0`,
        calQuery : `"1008" <= 5000 AND "1008" >= 0`,
        sugQuery : `"1063" <= 3000 AND "1063" >= 0`,
        fatQuery : `"1004" <= 3000 AND "1004" >= 0`,
        carbQuery : `"1005" <= 3000 AND "1005" >= 0`,
        proQuery : `"1003" <= 3000 AND "1093" >= 0`
    
    }
    handleChangeCal = sliderValues => {
        this.setState({ 
            calQuery : `"1008" < ${Math.max(... sliderValues).toString()} AND "1008" > ${Math.min(... sliderValues).toString()}` 
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };  
    handleChangeSod = sliderValues => {
        this.setState({ 
            sodiumQuery : `"1093" < ${Math.max(... sliderValues).toString()} AND "1093" > ${Math.min(... sliderValues).toString()}`
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };  
    handleChangeSug = sliderValues => {
        this.setState({ 
            sugQuery : `"1063" < ${Math.max(... sliderValues).toString()} AND "1063" > ${Math.min(... sliderValues).toString()}`
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };  
    handleChangeFat = sliderValues => {
        this.setState({ 
            fatQuery : `"1004" < ${Math.max(... sliderValues).toString()} AND "1004" > ${Math.min(... sliderValues).toString()}`
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };  
    handleChangeCarb = sliderValues => {
        this.setState({ 
            carbQuery : `"1005" < ${Math.max(... sliderValues).toString()} AND "1005" > ${Math.min(... sliderValues).toString()}`
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };  
    handleChangePro = sliderValues => {
        this.setState({ 
            proQuery : `"1003" < ${Math.max(... sliderValues).toString()} AND "1003" > ${Math.min(... sliderValues).toString()}`
         });
         this.props.handler([this.state.sodiumQuery, this.state.calQuery, this.state.sugQuery, this.state.fatQuery, this.state.carbQuery, this.state.proQuery])
    };    
    render() {
		return (
            <div className = "card">
                <div style={wrapperStyle}>
                <p>Calories</p>
                <Range id='calRange' min={0} max={5000} defaultValue={[0, 5000]} onChange = {this.handleChangeCal} tipFormatter={value => `${value} KCal`} />
                </div>
                <div style={wrapperStyle}>
                <p>Sodium</p>
                <Range id='sodRange' min={0} max={3000} defaultValue={[0, 3000]} onChange = {this.handleChangeSod} tipFormatter={value => `${value} Mg`} />
                </div>
                <div style={wrapperStyle}>
                <p>Sugars</p>
                <Range id='sugRange' min={0} max={3000} defaultValue={[0, 3000]} onChange = {this.handleChangeSug} tipFormatter={value => `${value} G`} />
                </div>
                <div style={wrapperStyle}>
                <p>Fats</p>
                <Range id='fatRange' min={0} max={3000} defaultValue={[0, 3000]} onChange = {this.handleChangeFat} tipFormatter={value => `${value} G`} />
                </div>
                <div style={wrapperStyle}>
                <p>Carbs</p>
                <Range id='carbRange' min={0} max={3000} defaultValue={[0, 3000]} onChange = {this.handleChangeCarb} tipFormatter={value => `${value} G`} />
                </div>
                <div style={wrapperStyle}>
                <p>Protien</p>
                <Range id='proRange' min={0} max={3000} defaultValue={[0, 3000]} onChange = {this.handleChangePro} tipFormatter={value => `${value} G`} />
                </div>
            </div>
		);
	}
}
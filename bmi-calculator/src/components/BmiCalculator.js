import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';

const BmiCalculator = props => {
    const { calculateBmiValue } = props;
    
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [unit, setUnit] = useState('Metric');
    // const [count, setCount] = useState({
    //     data: {
    //         heightCount: '0',
    //         inchesCount: '0',
    //         weightCount: '0'
    //     }
    // });
    const [count, setCount] = useState({
        heightCount: '0',
        inchesCount: '0',
        weightCount: '0'
    });

    const { heightCount, inchesCount, weightCount } = count;

    useEffect(() => {
        metricBMI(heightCount, weightCount);
        imperialBMI(heightCount, weightCount, inchesCount);
        //eslint-disable-next-line
    }, [heightCount, weightCount, inchesCount]); //dependency array to watch property changes

    const onChangeInput = e => {
        const { name, value } = e.target;
        // const { data } = count;

        //dynamically set input based on target name
        // setCount({
        //     data: {
        //         ...data, //pass in previous values of count.data object before updating
        //         [name]: value
        //     }
        // });
        setCount(prevState => ({ ...prevState, [name]: value }));
    };

    const onSelectTag = e => {
        setUnit(e.target.value);

        if (e.target.value === 'Metric') {
            setHeightUnit('cm');
            setWeightUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    };

    const metricBMI = (height, weight) => {
        if (height > 0 && weight > 0) {
            const heightToMeters = height / 100;
            const bmi = weight / Math.pow(heightToMeters, 2);
            calculateBmiValue(Math.round(bmi));
        }
    };

    const imperialBMI = (height, weight, inches) => {
        if (height > 0 && weight > 0 && inches > 0) {
            const heightToInches = (height * 12) + parseInt(inches);
            const bmi = 703 * (weight / (Math.pow(heightToInches, 2)));
            calculateBmiValue(Math.round(bmi));
        }
    }

    const resetData = e => {
        e.preventDefault();

        calculateBmiValue(0);
        setUnit('Metric');
        setCount({
            heightCount: '0',
            inchesCount: '0',
            weightCount: '0'
        });
        setHeightUnit('cm');
        setWeightUnit('kg');
    }

    return (
        <div className='bmi-inputs'>
            <div className='input-fields'>
                <div>
                    <span className='label-unit'>Unit</span>
                    <div className='unit'>
                        <select name='unit' value={unit} onChange={onSelectTag} className='form-control form-control-sm'>
                            <option value='Metric'>Metric</option>
                            <option value='Imperial'>Imperial</option>
                        </select>
                    </div>
                </div>
                <FormInput type='text' name='heightCount' 
                            title={`Height (${heightUnit})`} value={heightCount} onChange={onChangeInput} />

                {
                    unit === 'Imperial' ? 
                    <FormInput type='text' name='inchesCount' 
                                title={` (in)`} value={inchesCount} onChange={onChangeInput} /> : ''
                }

                
                <FormInput type='text' name='weightCount' 
                            title={`Weight (${weightUnit})`} value={weightCount} onChange={onChangeInput} />
            </div>

            <button className='button' type='submit' onClick={resetData}>Reset</button>
        </div>
    )
};

BmiCalculator.propTypes = {
    calculateBmiValue: PropTypes.func.isRequired
};

export default BmiCalculator;

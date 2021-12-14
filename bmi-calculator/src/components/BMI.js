import React, { useState } from 'react';
import BmiCalculator from './BmiCalculator';

const BMI = () => {
    const [bmiValue, setBmiValue] = useState(0);

    const getBmiClass = bmi => {
        if (bmi >= 1 && bmi <= 18.5) return 'Underweight';
        if (bmi >= 18.6 && bmi <= 24.9) return 'Healthy Weight';
        if (bmi >= 25 && bmi <= 29.9) return 'Overweight';
        if (bmi >= 30) return 'Obese';
    };

    const bmiBackgroundColor = bmi => {
        if (bmi >= 1 && bmi <= 18.5) return '#fed88b';
        if (bmi >= 18.6 && bmi <= 24.9) return '#80ff80';
        if (bmi >= 25 && bmi <= 29.9) return '#ff7f50';
        if (bmi >= 30) return '#ff5411';
    };

    const bmiCategory = getBmiClass(bmiValue);

    let bmiClass = '';

    if (bmiValue > 0 && bmiCategory) {
        bmiClass = bmiCategory.split(' ')[0].toLowerCase();
    }
    
    return (
        <div className='calculator' style={ { backgroundColor: bmiBackgroundColor(bmiValue) } }>
            <h3>Body Mass Index Calculator</h3>
            <div className='bmi-result-container'>
                <div className='bmi-result'>
                    <div className='bmi-result-number'>
                        Body Mass Index (BMI) = {bmiValue}
                    </div>
                    <div className={`bmi-category ${bmiClass}`}>
                        {bmiCategory}
                    </div>
                </div>
            </div>

            <BmiCalculator calculateBmiValue={setBmiValue} />
        </div>
    )
};

export default BMI;

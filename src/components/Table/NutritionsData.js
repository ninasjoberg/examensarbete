import React, { Component } from 'react';
import './NutritionsData.css'

class NutritionsData extends Component {

    render() {
        const { calculatedNutritionResult } = this.props;
        let nutritionsDivs;

        if(calculatedNutritionResult.length){
            nutritionsDivs = calculatedNutritionResult.map((nutrition, index) => {
                if((nutrition.value >= 0) ){ // to only return values and not null or NaN
                    return <div className="nutrition-data" key={index}>{nutrition.value}</div>
                }
                else {
                    return <div className="nutrition-data" key={index}></div>
                }
            })
        }

        return (
            <div className="nutrition-container">
                {nutritionsDivs}
            </div>
        );
    }
}

export default (NutritionsData);
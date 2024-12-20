export default function filterRiForPersonData(sex, age, isPregnant, isBreastfeeding) {

    let personData = '';

    if(sex === 'woman') {
        if(isPregnant){
            personData = 'womanPregnant';
        }
        else if(isBreastfeeding){
            personData = 'womanBreastfeeding';
        }
        else if( age >= 18 && age <= 30){
            personData = 'woman1830';
        }
        else if( age >= 31 && age <= 60){
            personData = 'woman3160';
        }
        else if( age >= 61 && age <= 74){
            personData = 'woman6174';
        }
        else if( age >= 75){
            personData = 'womangreater75';
        }
    }
    else if(sex === 'man') {
        if( age >= 18 && age <= 30){
            personData = 'man1830';
        }
        else if( age >= 31 && age <= 60){
            personData = 'man3160';
        }
        else if( age >= 61 && age <= 74){
            personData = 'man6174';
        }
        else if( age >= 75){
            personData = 'mangreater75';
        }
    }
    return personData;
}



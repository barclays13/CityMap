"use strict";

class CityMap {

    constructor (data, delimiter) {
        const arr =  data.split(delimiter).filter(str => str || str.length !== 0);
        const oneCity = arr.map(elem => {
            return elem.replace(/"/g, '').split(',');
        });

        let listLatitudes = [];  //список всех широт
        let listLongitudes = []; //список всех долгот))
        oneCity.map(elem => {
            listLatitudes.push(Number(elem[2]));
            listLongitudes.push(Number(elem[3]));
        });

        this.oneCity = oneCity;
        this.listLatitudes = listLatitudes;
        this.listLongitudes = listLongitudes;
    }


    findNameCity(quantity, geographicCoordinates, infoSide) { // находит название крайнего города выбраной части света

        const index = this.oneCity.findIndex(elem =>  Number(elem[geographicCoordinates]) === quantity);
        const nameCity =  this.oneCity[index];
        console.log(`Крайний город на ${infoSide} :${nameCity[0]},${nameCity[1]}`);
        // return nameCity[0];
    }

    sideOfLight (side) {  //найти по запросу крайние города - 1)Elementary
        switch (side) {
            case 'North':
                const maxLatitudes = Math.max(...this.listLatitudes);
                this.findNameCity(maxLatitudes, 2, side);
                break;
            case 'South':
                const minLatitudes = Math.min(...this.listLatitudes);
                this.findNameCity(minLatitudes, 2, side);
                break;
            case 'East':
                const maxLongitudes = Math.max(...this.listLongitudes);
                this.findNameCity(maxLongitudes, 3, side);
                break;
            case 'West':
                const minLongitudes = Math.min(...this.listLongitudes);
                this.findNameCity(minLongitudes, 3, side);
                break;
            default:
                alert( `Нет такого значения` );
          }
    }

    nearCity (addLatitudes, addLongitudes){
        const resultLatitudes = this.listLatitudes.map( elem => addLatitudes - elem); // нахожу разность по широте
        const resultLongitudes = this.listLongitudes.map( elem => addLongitudes - elem); // нахожу разность по долготе
        let distanceToСities = []; // сумму разностоей поэлементно
        for (let index = 0; index < resultLatitudes.length; index++) {
            const distance = Math.sqrt((resultLatitudes[index]**2) + (resultLongitudes[index]**2));
            distanceToСities.push(distance);
        }

        const minDistance = Math.min(...distanceToСities); // минимальный реззультат
        const index = distanceToСities.findIndex(elem =>  elem === minDistance); //index ближайшего города
        console.log(`Ближайший город ${this.oneCity[index][0]}, для ${addLatitudes} - широты ${addLongitudes} - долготы`);
    }

    stateAbbreviations () {
        const listStateAbbreviations = this.oneCity.map(item => item[1].trim());
        let uniqueListStateAbbreviations = [];
        for (let abbreviations of listStateAbbreviations) {
            if (!uniqueListStateAbbreviations.includes(abbreviations)) {
                uniqueListStateAbbreviations.push(`${abbreviations}`);
            }
        }
        let resultString = uniqueListStateAbbreviations.join(' ');
        console.log(`Уникальные названия штатов: "${resultString}"`);
    }

}

export default CityMap;

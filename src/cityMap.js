"use strict";
import City from './City.js';

const writeSideOfLight = document.querySelector('.write-side-of-light'),
    writeNameCity = document.querySelector('.write-name-sity'),
    writeLatitude = document.querySelector('.write-latitude'),
    writeLongitude = document.querySelector('.write-longitude'),
    writeNameSityNear = document.querySelector('.write-name-sity-near'),
    listState = document.querySelector('.list-state'),
    readState = document.querySelector('.read-state'),
    writeNemeSities = document.querySelector('.write-neme-sities'),
    newName = document.querySelector('.add-city-name'),
    newState = document.querySelector('.add-city-state'),
    newLatitude = document.querySelector('.add-city-latitude'),
    newLongitude = document.querySelector('.add-city-longitude'),
    writeCitiesLocal = document.querySelector('.write-cities-local');

class CityMap {

    constructor(data, delimiter) {
        this.cities = [];
        let citiesString = data.split(delimiter).filter(str => str || str.length !== 0).map(element => {
            return element.replace(/"/g, '').split(',');
        });

        citiesString.forEach(element => {
            const item = new City(element[0].trim(), element[1].trim(), element[2].trim(), element[3].trim());
            this.cities.push(item);
        });

        this.citiesString = citiesString;
    }

    getCoordinatesLatitudes() {
        let listLatitudes = []; //список всех широт
        this.cities.map(elem => {
            listLatitudes.push(Number(elem.latitude));
        });
        return listLatitudes;
    }

    getCoordinatesLongitudes() {
        let listLongitudes = []; //список всех широт
        this.cities.map(elem => {
            listLongitudes.push(Number(elem.longitude));
        });
        return listLongitudes;
    }

    findSideOfLight() {
            const side = writeSideOfLight.value.trim().toLowerCase();
            switch (side) {
                case 'north':
                    const maxLatitude = Math.max(...this.getCoordinatesLatitudes());
                    this.cities.forEach(element => {
                        if (maxLatitude === Number(element.latitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                case 'south':
                    const minLatitude = Math.min(...this.getCoordinatesLatitudes());
                    this.cities.forEach(element => {
                        if (minLatitude === Number(element.latitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                            return;
                        }
                    });
                    break;

                case 'east':
                    const maxLongitude = Math.max(...this.getCoordinatesLongitudes());
                    this.cities.forEach(element => {
                        if (maxLongitude === Number(element.longitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                case 'west':
                    const minLongitude = Math.min(...this.getCoordinatesLongitudes());
                    this.cities.forEach(element => {
                        if (minLongitude === Number(element.longitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                default:
                    writeNameCity.textContent = `Ваши введенные данные не верны, правильный формат:West, East, North, South`;
            }
    }

    findNearCity() {
        if (writeLatitude.value == '' || writeLongitude.value == '') {
            writeNameSityNear.textContent = `Введите данные`;
            return;
        }

        const resultLatitudes = this.getCoordinatesLatitudes().map(elem => writeLatitude.value - elem);
        const resultLongitudes = this.getCoordinatesLongitudes().map(elem => writeLongitude.value - elem);
        let distanceToСities = [];
        for (let index = 0; index < resultLatitudes.length; index++) {
            const distance = Math.sqrt((resultLatitudes[index] ** 2) + (resultLongitudes[index] ** 2));
            distanceToСities.push(distance);
        }

        const minDistance = Math.min(...distanceToСities); // минимальный реззультат
        const index = distanceToСities.findIndex(elem => elem === minDistance); //index ближайшего города
        writeNameSityNear.textContent = `Ближайший город ${this.cities[index].name}, для ${writeLatitude.value} - широты и ${writeLongitude.value} - долготы`;
    }

    getStateAbbreviations() {
        const listStateAbbreviations = this.cities.map(item => item.state);
        let uniqueListStateAbbreviations = [];
        for (let abbreviations of listStateAbbreviations) {
            if (!uniqueListStateAbbreviations.includes(abbreviations)) {
                uniqueListStateAbbreviations.push(`${abbreviations}`);
            }
        }

        let resultString = uniqueListStateAbbreviations.join(' ');
        listState.textContent = `Уникальные названия штатов: "${resultString}"`;
    }

    serchState() {
        let resultListCities = [];
        this.cities.forEach(elem => {
            if (readState.value.length < 2) {
                resultListCities.length = 0;
            }

            if (elem.state.trim().toLowerCase() === readState.value.trim().toLowerCase()) {
                let index = this.cities.findIndex(ind => ind === elem);
                resultListCities.push(this.cities[index].name.trim());
            }
        });

        writeNemeSities.textContent = resultListCities.join(', ');
    }

    addCity() {
        event.preventDefault();
        const newCity = new City(newName.value, newState.value, newLatitude.value,newLongitude.value);
        this.cities.push(newCity);
    }

    saveListCityInLocalStorage() {
        let listNameCities = "";
        this.cities.forEach(city => {
            listNameCities = listNameCities.concat(city.toString());
        });

        localStorage.setItem('dataCities', listNameCities);
    }

    getListCityInLocalStorage() {
        let cityStrings = localStorage.getItem('dataCities').split(';').filter(str => str || str.length !== 0);
        let cityString = cityStrings.map(element => {
            return element.replace(/"/g, '').split(',');
        });

        this.cities = [];
        cityString.forEach(element => {
            const item = new City(element[0].trim(), element[1].trim(), element[2].trim(), element[3].trim());
            this.cities.push(item);
        });

        let listNameCities = "";
        this.cities.map(city => {
            listNameCities = listNameCities.concat(`${city.name} `);
        });

        writeCitiesLocal.textContent = listNameCities.trim();
    }
}

export default CityMap;

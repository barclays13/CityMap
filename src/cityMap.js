"use strict";
import City from './City.js';

const writeSideOfLight = document.querySelector('.write-side-of-light'),
    btnSearchCity = document.querySelector('.btn-search-city'),
    writeNameCity = document.querySelector('.write-name-sity'),
    writeLatitude = document.querySelector('.write-latitude'),
    writeLongitude = document.querySelector('.write-longitude'),
    btnSearchCityNear = document.querySelector('.btn-search-city-near'),
    writeNameSityNear = document.querySelector('.write-name-sity-near'),
    listState = document.querySelector('.list-state'),
    btnSearchState = document.querySelector('.btn-search-state'),
    readState = document.querySelector('.read-state'),
    writeNemeSities = document.querySelector('.write-neme-sities'),
    newName = document.querySelector('.add-city-name'),
    newState = document.querySelector('.add-city-state'),
    newLatitude = document.querySelector('.add-city-latitude'),
    newLongitude = document.querySelector('.add-city-longitude'),
    btnAddCity = document.querySelector('.add-city-submit'),
    writeCitiesLocal = document.querySelector('.write-cities-local'),
    removeLocalStorage = document.querySelector('.remove-local-storage');
class CityMap {

    constructor(data, delimiter) {
        this.cities = [];
        let dataShare = data.split(delimiter).filter(str => str || str.length !== 0);
        let cleanData = dataShare.map(element => {
            return element.replace(/"/g, '').split(',');
        });

        this.conversionData(cleanData);
        let listLatitudes = []; //список всех широт
        let listLongitudes = []; //список всех долгот))
        this.cities.map(elem => {
            listLatitudes.push(Number(elem.latitude));
            listLongitudes.push(Number(elem.longitude));
        });
        this.cleanData = cleanData;
        this.listLatitudes = listLatitudes;
        this.listLongitudes = listLongitudes;
    }

    conversionData(data) {
        data.forEach(element => {
            const item = new City(element[0].trim(), element[1].trim(), element[2].trim(), element[3].trim());
            this.cities.push(item);
        });
    }

    sideOfLight() {
        btnSearchCity.addEventListener('click', () => {
            const side = writeSideOfLight.value.trim().toLowerCase();
            switch (side) {
                case 'north':
                    const maxLatitude = Math.max(...this.listLatitudes);
                    this.cities.forEach(element => {
                        if (maxLatitude === Number(element.latitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                case 'south':
                    const minLatitude = Math.min(...this.listLatitudes);
                    this.cities.forEach(element => {
                        if (minLatitude === Number(element.latitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                case 'east':
                    const maxLongitude = Math.max(...this.listLongitudes);
                    this.cities.forEach(element => {
                        if (maxLongitude === Number(element.longitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                case 'west':
                    const minLongitude = Math.min(...this.listLongitudes);
                    this.cities.forEach(element => {
                        if (minLongitude === Number(element.longitude)) {
                            writeNameCity.textContent = `Крайний город - ${element.name}`;
                        }
                    });
                    break;

                default:
                    writeNameCity.textContent = `Ваши введенные данные не верны, правильный формат:West, East, North, South`;
            }
        });
    }

    nearCity() {


        btnSearchCityNear.addEventListener('click', () => {
            if (writeLatitude.value == '' || writeLongitude.value == '') {
                writeNameSityNear.textContent = `Введите данные`;
                return;
            }
            const resultLatitudes = this.listLatitudes.map(elem => writeLatitude.value - elem); // нахожу разность по широте
            const resultLongitudes = this.listLongitudes.map(elem => writeLongitude.value - elem); // нахожу разность по долготе
            let distanceToСities = [];
            for (let index = 0; index < resultLatitudes.length; index++) {
                const distance = Math.sqrt((resultLatitudes[index] ** 2) + (resultLongitudes[index] ** 2));
                distanceToСities.push(distance);
            }

            const minDistance = Math.min(...distanceToСities); // минимальный реззультат
            const index = distanceToСities.findIndex(elem => elem === minDistance); //index ближайшего города
            writeNameSityNear.textContent = `Ближайший город ${this.cities[index].name}, для ${writeLatitude.value} - широты и ${writeLongitude.value} - долготы`;
        });
    }

    stateAbbreviations() {

        btnSearchState.addEventListener('click', () => {
            const listStateAbbreviations = this.cities.map(item => item.state);
            let uniqueListStateAbbreviations = [];
            for (let abbreviations of listStateAbbreviations) {
                if (!uniqueListStateAbbreviations.includes(abbreviations)) {
                    uniqueListStateAbbreviations.push(`${abbreviations}`);
                }
            }
            let resultString = uniqueListStateAbbreviations.join(' ');
            listState.textContent = `Уникальные названия штатов: "${resultString}"`;
        });
    }

    serchState() {

        let resultListCities = [];

        readState.addEventListener('input', () => {

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
        });
    }

    addCity() {
        const newCity = [];

        btnAddCity.addEventListener('click', () => {
            event.preventDefault();
            if (newCity.length == 1) {
                newCity.length = 0;
            }

            newCity.push([newName.value, newState.value, newLatitude.value, newLongitude.value]);
            this.conversionData(newCity);
        });
    }

    saveListCityInLocalStorage() {


        window.addEventListener("beforeunload", () => {
            let listNameCities = "";
            this.cities.map(city => {
                listNameCities = listNameCities.concat(city.toString());
            });

            localStorage.setItem('listCities', listNameCities);
        });

        window.addEventListener("load", () => {
            let dataShare = localStorage.getItem('listCities').split(';').filter(str => str || str.length !== 0);

            let cleanData = dataShare.map(element => {
                return element.replace(/"/g, '').split(',');
            });
            this.cities = [];
            this.conversionData(cleanData);

            let listNameCities = "";
            this.cities.map(city => {
                listNameCities = listNameCities.concat(`${city.name} `);
            });
            writeCitiesLocal.textContent = listNameCities.trim();

        });

    }
}

export default CityMap;
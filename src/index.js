import CityMap from './cityMap.js';

let cityUSA = new CityMap ('"Nashville, TN", 36.17, -86.78; "New York, NY", 40.71, -74.00; "Atlanta, GA", 33.75, -84.39; "Denver, CO", 39.74, -104.98; "Seattle, WA", 47.61, -122.33; "Los Angeles, CA", 34.05, -118.24; "Memphis, TN", 35.15, -90.05;', ';');

const btnAddCity = document.querySelector('.add-city-submit'),
    btnSearchState = document.querySelector('.btn-search-state'),
    readState = document.querySelector('.read-state'),
    btnSearchCity = document.querySelector('.btn-search-city'),
    btnSearchCityNear = document.querySelector('.btn-search-city-near');

btnSearchCity.addEventListener('click', cityUSA.sideOfLight.bind(cityUSA));
btnSearchCityNear.addEventListener('click', cityUSA.nearCity.bind(cityUSA));
btnSearchState.addEventListener('click', cityUSA.stateAbbreviations.bind(cityUSA));
readState.addEventListener('input', cityUSA.serchState.bind(cityUSA));
btnAddCity.addEventListener('click', cityUSA.addCity.bind(cityUSA));
window.addEventListener("beforeunload", cityUSA.saveListCityInLocalStorage.bind(cityUSA));
window.addEventListener("load", cityUSA.getListCityInLocalStorage.bind(cityUSA));
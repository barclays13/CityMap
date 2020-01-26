import CityMap from './cityMap.js';



let citiUSA = new CityMap ('"Nashville, TN", 36.17, -86.78; "New York, NY", 40.71, -74.00; "Atlanta, GA", 33.75, -84.39; "Denver, CO", 39.74, -104.98; "Seattle, WA", 47.61, -122.33; "Los Angeles, CA", 34.05, -118.24; "Memphis, TN", 35.15, -90.05;', ';');

citiUSA.sideOfLight();
citiUSA.nearCity();
citiUSA.stateAbbreviations();
citiUSA.serchState();
citiUSA.addCity();
citiUSA.saveListCityInLocalStorage();

import CityMap from './cityMap.js';


const city = new CityMap('"Nashville, TN", 36.17, -86.78; "New York, NY", 40.71, -74.00; "Atlanta, GA", 33.75, -84.39; "Denver, CO", 39.74, -104.98; "Seattle, WA", 47.61, -122.33; "Los Angeles, CA", 34.05, -118.24; "Memphis, TN", 35.15, -90.05;', ';');
  
city.sideOfLight('West'); //West , East, North, South
city.nearCity(200.23,200.66); //широта и долгота
city.stateAbbreviations(); // абривиатуры городов
city.serchState();


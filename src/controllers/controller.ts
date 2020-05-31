/* eslint-disable no-console */
import { Request, Response } from 'express';
import axios from 'axios';
import token from '../../util/token.js';
import Wheater from '../model/Wheater';

interface RequestDTO {
  data: {
    name: string;
    main: {
      temp: number;
    };
  };
}

const API_KEY = token;

export const renderHomePage = (_: Request, response: Response): void => {
  return response.render('index');
};
export const renderAboutPage = (_: Request, response: Response): void => {
  return response.render('about');
};
export const getWeather = (request: Request, response: Response): void => {
  const { city } = request.body;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const wheaterInstance = new Wheater(city);
  wheaterInstance.validateUserInput();

  if (wheaterInstance.getErros().length === 0) {
    axios
      .get(url)
      .then((responseAPI: RequestDTO) => {
        const { temp } = responseAPI.data.main;
        const { name } = responseAPI.data;
        return response.render('index', {
          weather: `It is currently ${temp} in ${name}`,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return response.render('index', {
    error: wheaterInstance.getErros()[0].toLocaleString(),
  });
};

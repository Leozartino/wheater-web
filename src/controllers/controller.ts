/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import Wheater from '../model/Wheater';

const API_KEY = 'aa528343fb2a6e1dcb3a3d854db022f3';

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
      .then(responseAPI => {
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

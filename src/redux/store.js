// вставляємо boiler played code - шаблонний код

import { devToolsEnhancer } from '@redux-devtools/extension';
import { combineReducers, createStore } from 'redux';
import { productReducer } from './products/products.reducer';

// тут ми скажемо що наш rootReducer буде викликати ф-ю combineReducers і сюди ми будемо передавати обєкт редюсерів
const rootReducer = combineReducers({
  productsStore: productReducer,
});

const enhancer = devToolsEnhancer();

// store - саме сховище, в нього передається кореневий reducer - (rootReducer)
export const store = createStore(rootReducer, enhancer);

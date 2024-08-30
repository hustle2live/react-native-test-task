import React, { useState } from 'react';
import { Inspiration } from '../types';

class Inspirations {
   store: Inspiration[];

   constructor() {
      this.store = [] as Inspiration[];
   }

   async add(elem: Inspiration) {
      this.store.push(elem);
   }

   getAll() {
      return this.store;
   }

   isEmpty() {
      return !(this.store.length > 0);
   }
}

const Store = new Inspirations();

export { Store as InspirationStore };

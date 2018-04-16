//Library Imports
import { EventEmitter } from '@angular/core';

//Custom Components
import { Error } from './error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any) {
    const errorData = new Error(error.title, error.error.message); //error object inside mongose error object
    this.errorOccurred.emit(errorData);
  }
}

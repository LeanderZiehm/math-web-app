import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubmitPayload {
  firstNumber: number;
  secondNumber: number;
  operator: string;
  solution: number;
  input: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class MathService {
  private apiUrl = 'https://math-api.leanderziehm.com/submit';
  private http = inject(HttpClient);

  submitAnswer(payload: SubmitPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
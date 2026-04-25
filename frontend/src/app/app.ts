import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MathService } from './services/math-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  submitted = false;

  current: any = {};
  streak = 0;
  total = 0;
  answerInput: number | null = null;

  history: any[] = JSON.parse(localStorage.getItem('mathHistory') || '[]');

  private mathService = inject(MathService);

  constructor() {
    this.load();
    this.generate();
  }

  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  save() {
    localStorage.setItem('mathHistory', JSON.stringify(this.history));
    localStorage.setItem('streak', this.streak.toString());
    localStorage.setItem('total', this.total.toString());
  }

  load() {
    this.streak = parseInt(localStorage.getItem('streak') || '0');
    this.total = parseInt(localStorage.getItem('total') || '0');
  }

  generate() {
    const ops = ['+', '-', '*', '/'];
    const op = ops[this.rand(0, 3)];

    let a, b, question, answer;

    if (op === '+') {
      a = this.rand(0, 10000);
      b = this.rand(0, 10000);
      answer = a + b;
      question = `${a} + ${b}`;
    }

    if (op === '-') {
      a = this.rand(0, 10000);
      b = this.rand(0, a);
      answer = a - b;
      question = `${a} - ${b}`;
    }

    if (op === '*') {
      a = this.rand(1, 100);
      b = this.rand(1, 100);
      answer = a * b;
      question = `${a} × ${b}`;
    }

    if (op === '/') {
      b = this.rand(1, 100);
      answer = this.rand(1, 100);
      a = b * answer;
      question = `${a} ÷ ${b}`;
    }

    this.current = { question, answer };
    this.answerInput = null;
    this.submitted = false; // reset
  }

  checkAnswer() {
    this.submitted = true;

    const user = this.answerInput;
    const correct = user === this.current.answer;

    this.total++;

    const payload = {
      firstNumber: this.current.a,
      secondNumber: this.current.b,
      operator: this.current.op,
      solution: this.current.answer,
      input: user
    };

    this.mathService.submitAnswer(payload).subscribe({
      next: (res) => console.log('Submitted:', res),
      error: (err) => console.error('Error submitting:', err)
    });

    this.history.push({
      question: this.current.question,
      correctAnswer: this.current.answer,
      userAnswer: user,
      correct,
      time: new Date().toISOString()
    });

    if (correct) {
      this.streak++;
    } else {
      this.streak = 0;
    }

    this.save();
  }
  nextQuestion() { this.generate(); }
}

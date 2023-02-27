/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { QuizPage } from '../page';

const initialProps = {
  teamPreset: {
    title: '',
    description: '',
    scores: {
      courage: 0,
      focus: 0,
      commitment: 0,
      respect: 0,
      opennes: 0,
    },
  },
  scores: {
    courage: 0,
    focus: 0,
    commitment: 0,
    respect: 0,
    opennes: 0,
  },
  quizData: [],
  gameStep: 'teamPreset',
  isAnswerScoresVisible: false,
  isButtonDisabled: false,
  isAnyAnswerSelected: false,
  currentQuestionId: 0,
  currentAnswerId: null,
};

it('render teamPreset step', () => {
  render(<QuizPage {...initialProps} gameStep={'teamPreset'} />);

  const btnElement = screen.queryByTestId('nextPresetBtn');

  expect(btnElement).not.toBeNull();
});

it('render quiz step', () => {
  render(<QuizPage {...initialProps} gameStep={'quiz'} />);

  const button = screen.queryByTestId('nextPresetBtn');

  expect(button).not.toBeNull();
});

it('render gameOver step', () => {
  render(<QuizPage {...initialProps} gameStep={'gameOver'} />);

  const element = screen.queryByTestId('gameOver');

  expect(element).not.toBeNull();
});

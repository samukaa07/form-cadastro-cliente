import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepIndicator } from '../StepIndicator';

describe('StepIndicator', () => {
  it('marca a etapa atual como ativa', () => {
    render(<StepIndicator currentStep={2} />);

    const itemAtivo = screen.getByText('Informações Residenciais').closest('li');
    expect(itemAtivo).toHaveClass('step-indicator__item--active');
  });

  it('marca etapas anteriores como concluídas', () => {
    render(<StepIndicator currentStep={2} />);

    const itemConcluido = screen.getByText('Dados Pessoais').closest('li');
    expect(itemConcluido).toHaveClass('step-indicator__item--done');
  });

  it('marca etapas futuras como pendentes', () => {
    render(<StepIndicator currentStep={2} />);

    const itemPendente = screen.getByText('Informações Profissionais').closest('li');
    expect(itemPendente).toHaveClass('step-indicator__item--pending');
  });
});

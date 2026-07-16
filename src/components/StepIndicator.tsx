interface StepIndicatorProps {
  currentStep: number;
}

const STEPS = ['Dados Pessoais', 'Informações Residenciais', 'Informações Profissionais', 'Resumo'];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="step-indicator">
      {STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const status =
          stepNumber === currentStep ? 'active' : stepNumber < currentStep ? 'done' : 'pending';

        return (
          <li key={label} className={`step-indicator__item step-indicator__item--${status}`}>
            <span className="step-indicator__number">{stepNumber}</span>
            <span className="step-indicator__label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

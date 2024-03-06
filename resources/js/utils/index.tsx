export const ifElse = (
  condition: boolean,
  trueCase: string,
  falseCase: string
): string => {
  return condition ? trueCase : falseCase;
};

export const classNames = (...classes: unknown[]) => {
  return classes.filter(Boolean).join(' ');
};

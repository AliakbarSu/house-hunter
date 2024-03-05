export const ifElse = (
  condition: boolean,
  trueCase: string,
  falseCase: string
): string => {
  return condition ? trueCase : falseCase;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

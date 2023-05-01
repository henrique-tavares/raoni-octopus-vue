export type FieldBinding = {
  name: string;
  onBlur: (e: Event) => unknown;
  onInput: (e: Event) => unknown;
  onChange: (e: Event) => unknown;
  'onUpdate:modelValue'?: (e: unknown) => unknown;
  value?: unknown;
  checked?: boolean;
};

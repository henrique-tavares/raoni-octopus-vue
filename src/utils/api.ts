export function apiObjectTranslator<T = any>(
  obj: object | object[] | string,
  mode: 'forward' | 'reverse' = 'forward'
): T {
  let translator: Record<string, string> = {
    authorized: 'autorizado',
    description: 'descricao',
    address: 'endereco',
    age: 'idade',
    name: 'nome',
    password: 'senha',
    sex: 'sexo',
    phones: 'telefones',
    city: 'cidade',
    complement: 'complemento',
    place: 'logradouro',
    state: 'estado',
    acronym: 'sigla'
  };

  if (mode == 'reverse') {
    translator = Object.fromEntries(Object.entries(translator).map(([key, value]) => [value, key]));
  }

  const jsonObj = typeof obj == 'object' ? JSON.stringify(obj) : obj;
  const translatedJsonObj = jsonObj.replace(
    new RegExp(
      Object.keys(translator)
        .map((e) => `"(${e})":`)
        .join('|'),
      'g'
    ),
    (match) => {
      return `"${translator[match.slice(1, -2)]}":`;
    }
  );
  const translatedObj = JSON.parse(translatedJsonObj) as T;
  return translatedObj;
}

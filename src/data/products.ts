export type CareDirection = {
  id: string;
  slug: string;
  kind: 'direction';
  name: string;
  purpose: string;
  description: string;
  details: { title: string; text: string }[];
};

// Launch-oriented brand copy. Packaging is a concept, not an approved SKU.
// Add formula, volume, price and product-specific claims only from approved data.
export const careDirections: CareDirection[] = [{
  id: 'pushii-care-shampoo',
  slug: 'shampoos',
  kind: 'direction',
  name: 'Шампуни с тёплым характером',
  purpose: 'Для ухода за шерстью',
  description: 'Уход — это ещё один способ побыть рядом. Подготовить полотенце, спокойно поговорить с питомцем и уделить ему немного больше внимания. Шампуни PUSHII — часть этих простых домашних ритуалов.',
  details: [
    { title: 'Начните с назначения', text: 'При выборе смотрите, для какого питомца и типа шерсти предназначено средство. Ориентируйтесь на описание конкретного шампуня и информацию на его этикетке.' },
    { title: 'Познакомьтесь с составом', text: 'Состав и рекомендации по применению помогают понять особенности средства. Обращайте внимание на ограничения, указанные на упаковке.' },
    { title: 'Следуйте инструкции', text: 'Способ применения и частота ухода зависят от выбранного средства. Сохраните упаковку, чтобы инструкция всегда была под рукой.' },
  ],
}];


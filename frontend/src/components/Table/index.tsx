import React from 'react';

import { Wrapper } from 'components/Table/styles';

function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

type PrimitiveType = string | symbol | number | boolean;

function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<Record<keyof T, (it: T) => React.ReactNode>>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
}

export default function Table<T extends MinTableItem>({ items, headers, customRenderers }: TableProps<T>) {
  function renderRow(item: T) {
    return (
      <tr key={Math.random()}>
        {objectKeys(item).map((itemProperty, index) => {
          if (itemProperty === 'id') return;
          const customRenderer = customRenderers?.[itemProperty];
          if (customRenderer) {
            return <td key={index}>{customRenderer(item)}</td>;
          }

          return (
            <td key={index}>{isPrimitive(item[itemProperty]) ? item[itemProperty] : ''}</td>
          );
        })}
      </tr>
    );
  }
  return (
    <Wrapper>
      <thead>
        <tr>
          {objectValues(headers).map((headerValue) => {
            if (headerValue !== 'ID') {
              return <th key={headerValue}>{headerValue}</th>;
            }
          })}
        </tr>
      </thead>
      <tbody>{items.map(renderRow)}</tbody>
    </Wrapper>
  );
}

import { ReactElement, memo } from "react";

const tableHeaderTitles: string[] = [
  "Номер",
  "Назва",
  "Ціна",
  "Перегляди",
  "Винагорода",
  "Створено",
];

export default memo(function LessonsTableHeader() {
  return (
    <thead>
      <tr>
        {tableHeaderTitles.map(
          (title: string, index: number): ReactElement => (
            <th key={index}>{title}</th>
          ),
        )}
      </tr>
    </thead>
  );
});

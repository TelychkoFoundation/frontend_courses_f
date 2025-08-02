import { ReactElement, memo } from "react";

const tableHeaderTitles: string[] = [
  "Номер",
  "Назва",
  "Ціна",
  "Уроки",
  "Статус",
  "Створено",
];

export default memo(function AdminCoursesTableHeader() {
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

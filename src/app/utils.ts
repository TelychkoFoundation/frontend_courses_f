export const createQueryString = (
  name: string,
  value: string,
  searchParams: string,
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

export const isNewCourse = (updatedAt: string | Date) => {
  const updated = new Date(updatedAt);
  const now = new Date();
  const diffInMs = now.getTime() - updated.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays < 14;
};

export const transliterate = (text: string): string => {
  const alphabetMap: { [key: string]: string } = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "H",
    Д: "D",
    Е: "E",
    Є: "YE",
    Ж: "ZH",
    З: "Z",
    И: "Y",
    І: "I",
    Ї: "YI",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "KH",
    Ц: "TS",
    Ч: "CH",
    Ш: "SH",
    Щ: "SCH",
    Ь: "",
    Ю: "YU",
    Я: "YA",
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ю: "yu",
    я: "ya",
    "'": "", // Апостроф удаляем
    " ": "-", // Пробел превращаем в "-"
  };

  // Преобразуем символы и оставляем только допустимые
  return text
    .split("")
    .map(letter => alphabetMap[letter] || letter)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\-]/g, ""); // Убираем любые недопустимые для S3 символы
};

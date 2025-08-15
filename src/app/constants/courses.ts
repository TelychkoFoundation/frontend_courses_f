import {
  CourseKeyTypes,
  ICourseAdminStatic,
  CourseDifficultyType,
} from "@/typings";

export const coursesTitles: Record<CourseKeyTypes, ICourseAdminStatic> = {
  [CourseKeyTypes.HTML5Basics]: {
    title: "Основи HTML5",
    courseKey: CourseKeyTypes.HTML5Basics,
    short_description:
      "Розпочни свій шлях у веб-розробці - дізнайся, як створюються сайти з нуля",
    description:
      "Цей курс - ідеальний старт для тих, хто ніколи не працював з HTML. Ми розберемо, що таке структура веб-сторінки, як працюють теги, атрибути, посилання, зображення та форми. Після завершення ти зможеш самостійно створювати прості, але грамотно побудовані сайти.",
    difficulty: CourseDifficultyType.Beginner,
    categories: {
      base: ["web-dev", "frontend", "html"],
      // levelTopics: ["beginner", "markup-basics", "web-basics"],
      // practical: ["nocode", "markup", "landing-pages"],
      // professional: ["prep-js"],
      // audience: ["students", "designers", "school"],
      // tags: ["self-study", "tech-base"],
    },
    prerequisites: "Бажання вчитися та базове володіння комп’ютером.",
    outcomes:
      "Вміння створювати структуру сайту, працювати з основними тегами HTML, формувати контент і посилання.",
  },
  [CourseKeyTypes.HTML5Advanced]: {
    title: "Просунутий HTML5",
    courseKey: CourseKeyTypes.HTML5Advanced,
    short_description:
      "Поглиблюй знання HTML - працюй з мультимедіа, формами та семантикою",
    description:
      "Тут ми вийдемо за межі основ. Розберемо сучасні можливості HTML5: відео, аудіо, семантичні теги, адаптивність та accessibility. Навчишся будувати структуровані та доступні сторінки для реальних проектів",
    difficulty: CourseDifficultyType.Advanced,
    categories: {
      base: ["web-dev", "frontend", "html"],
      // levelTopics: ["advanced", "markup-advanced"],
      // practical: ["semantic-structure", "seo", "landing-pages"],
      // professional: ["html-pro"],
      // audience: ["students", "junior-devs"],
      // tags: ["intensive", "tech-base"],
    },
    prerequisites: "Базові знання HTML та бажано - перший досвід верстки.",
    outcomes:
      "Впевнене використання сучасного HTML5, створення адаптивних і доступних інтерфейсів.",
  },
  [CourseKeyTypes.CSS3Basics]: {
    title: "Основи CSS3",
    courseKey: CourseKeyTypes.CSS3Basics,
    short_description: "Додай стилю своїм сторінкам - вивчай основи CSS",
    description:
      "Вивчиш, як змінювати вигляд елементів: кольори, шрифти, розміри, позиціювання. Зрозумієш, як працює каскадність, селектори, спадковість і макетування. Це базовий, але потужний крок у світ візуального оформлення сайтів.",
    difficulty: CourseDifficultyType.Beginner,
    categories: {
      base: ["web-dev", "frontend", "css"],
      // levelTopics: ["beginner", "style-basics"],
      // practical: ["layouts", "visual-styling", "school-course"],
      // professional: ["prep-js"],
      // audience: ["students", "designers", "school"],
      // tags: ["self-study", "tech-base"],
    },
    prerequisites: "Знання HTML на базовому рівні",
    outcomes:
      "Вміння стилізувати сторінку, розуміння селекторів, box model та основ позиціювання.",
  },
  [CourseKeyTypes.CSS3Advanced]: {
    title: "Просунутий CSS3",
    courseKey: CourseKeyTypes.CSS3Advanced,
    short_description: "Опануй Flexbox, Grid та анімації для сучасного дизайну",
    description:
      "Ти навчишся створювати гнучкі макети, адаптивний дизайн та анімації. Курс орієнтований на практичне застосування Flexbox, Grid, трансформацій, transition, media-запитів. Після нього твої сайти будуть виглядати професійно.",
    difficulty: CourseDifficultyType.Advanced,
    categories: {
      base: ["web-dev", "frontend", "css"],
      // levelTopics: ["advanced", "flexbox", "grid", "animations"],
      // practical: ["responsive", "interactive-ui"],
      // professional: ["frontend-pro"],
      // audience: ["junior-devs", "freelancers"],
      // tags: ["intensive", "real-projects"],
    },
    prerequisites: "Базові знання CSS3 та HTML.",
    outcomes:
      "Впевнена верстка складних інтерфейсів, адаптивність, анімація, використання сучасних інструментів CSS.",
  },
  [CourseKeyTypes.JSBasics]: {
    title: "Основи JavaScript",
    courseKey: CourseKeyTypes.JSBasics,
    short_description: "Зрозумій, як працює JavaScript - головна мова вебу",
    description:
      "Цей курс - перший крок у програмуванні. Розглянемо змінні, типи, умовні оператори, цикли, функції, масиви. Ти навчишся керувати поведінкою елементів на сторінці та писати базові скрипти.",
    difficulty: CourseDifficultyType.Beginner,
    categories: {
      base: ["web-dev", "frontend", "javascript"],
      // levelTopics: ["beginner", "js-basics"],
      // practical: ["interactive-web", "simple-apps"],
      // professional: ["js-foundation"],
      // audience: ["students", "designers", "new-devs"],
      // tags: ["self-study", "fundamentals"],
    },
    prerequisites: "Базові знання HTML/CSS.",
    outcomes:
      "Розуміння логіки JS, написання базових скриптів, вміння працювати з DOM.",
  },
  [CourseKeyTypes.JSAdvanced]: {
    title: "Просунутий JavaScript",
    courseKey: CourseKeyTypes.JSAdvanced,
    short_description:
      "Поглиблене занурення в JavaScript: об’єкти, замикання, call stack",
    description:
      "Курс для тих, хто вже знайомий з JS і хоче розуміти мову на глибшому рівні. Вивчимо об'єкти, функції вищого порядку, замикання, колбек-функції, асинхронність. Закладемо фундамент для вивчення фреймворків.",
    difficulty: CourseDifficultyType.Intermediate,
    categories: {
      base: ["web-dev", "frontend", "javascript"],
      // levelTopics: ["intermediate", "dom", "async", "oop"],
      // practical: ["mini-games", "apps", "event-loop"],
      // professional: ["prep-react", "interview"],
      // audience: ["junior-devs", "middle-devs"],
      // tags: ["real-projects", "deep-dive"],
    },
    prerequisites: "Базові знання JavaScript.",
    outcomes:
      "Впевнене володіння функціоналом мови, підготовка до використання бібліотек і фреймворків.",
  },
  [CourseKeyTypes.JSProfessional]: {
    title: "Професійний JavaScript",
    courseKey: CourseKeyTypes.JSProfessional,
    short_description:
      "Розберись, як працює JavaScript «під капотом» і навчися писати чистий код",
    description:
      "Ти зрозумієш, як працює JS-движок, garbage collection, стек викликів, область видимості, замикання, модулі, класи, async/await, обробка помилок. Це рівень, з якого починається професійний розвиток.",
    difficulty: CourseDifficultyType.Advanced,
    categories: {
      base: ["web-dev", "frontend", "javascript"],
      // levelTopics: ["advanced", "functional", "patterns", "architecture"],
      // practical: ["large-apps", "testing", "debugging"],
      // professional: ["js-pro", "team-dev"],
      // audience: ["middle-devs", "advanced-devs"],
      // tags: ["interview", "architecture"],
    },
    prerequisites: "Досвід роботи з JavaScript на рівні «Advanced».",
    outcomes:
      "Вміння читати й писати якісний, масштабований код, ефективне використання сучасного синтаксису.",
  },
  [CourseKeyTypes.Typescript]: {
    title: "TypeScript",
    courseKey: CourseKeyTypes.Typescript,
    short_description: "Перетвори свій JavaScript у типізований і надійний",
    description:
      "Вивчиш, як працює TypeScript, його основи: типи, інтерфейси, модулі тощо. Курс орієнтований на тих, хто хоче підвищити якість і безпеку свого коду.",
    difficulty: CourseDifficultyType.Advanced,
    categories: {
      base: ["web-dev", "frontend", "typescript"],
      // levelTopics: ["static-typing", "generics", "type-safe"],
      // practical: ["refactoring", "ts-in-react", "libs"],
      // professional: ["ts-pro"],
      // audience: ["middle-devs", "team-leads"],
      // tags: ["robust-code", "type-safety"],
    },
    prerequisites: "Хороше знання JavaScript.",
    outcomes:
      "Вміння створювати типізовані програми, інтеграція TS у проєкти, покращення читабельності та підтримуваності коду.",
  },
  [CourseKeyTypes.React]: {
    title: "React",
    courseKey: CourseKeyTypes.React,
    short_description:
      "Почни працювати з найпопулярнішим фреймворком фронтенду",
    description:
      "Тут ти познайомишся з компонентами, хуками, пропсами, станом. Розробиш перші SPA-додатки. Після завершення зможеш працювати з React-проєктами на базовому рівні.",
    difficulty: CourseDifficultyType.Intermediate,
    categories: {
      base: ["web-dev", "frontend", "react"],
      // levelTopics: ["components", "hooks", "routing"],
      // practical: ["spa", "dashboards", "client-side"],
      // professional: ["frontend-frameworks"],
      // audience: ["junior-devs", "middle-devs"],
      // tags: ["react-core", "hooks"],
    },
    prerequisites: "Досвід з JavaScript, HTML, CSS.",
    outcomes:
      "Розуміння основ React, вміння будувати компоненти, передавати дані, керувати станом.",
  },
  [CourseKeyTypes.ReactInDepth]: {
    title: "Поглиблений React",
    courseKey: CourseKeyTypes.ReactInDepth,
    short_description:
      "Поринь у внутрішню кухню React: контекст, оптимізація, архітектура",
    description:
      "Ми розглянемо шаблони проєктування, мемоізація, кастомні хуки, контекст, React Router, performance-оптимізацію. Цей курс - наступний крок після базового React.",
    difficulty: CourseDifficultyType.Advanced,
    categories: {
      base: ["web-dev", "frontend", "react"],
      // levelTopics: ["state", "context", "render", "performance"],
      // practical: ["optimization", "real-products", "clean-architecture"],
      // professional: ["senior-prep", "frameworks"],
      // audience: ["middle-devs", "advanced-devs"],
      // tags: ["react-pro", "advanced-hooks"],
    },
    prerequisites: "Добре знання React на базовому рівні.",
    outcomes:
      "Вміння проєктувати складні React-додатки, покращення продуктивності, глибше розуміння фреймворку.",
  },
};

export const CategoryDisplayMap: Record<string, string> = {
  // Base
  "web-dev": "Веб-розробка",
  frontend: "Frontend",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",

  // Level/Topics
  beginner: "Початковий рівень",
  intermediate: "Середній рівень",
  advanced: "Просунутий рівень",
  "markup-basics": "Основи розмітки",
  "markup-advanced": "Складна розмітка",
  "web-basics": "Основи веб",
  "style-basics": "Основи стилів",
  flexbox: "Flexbox",
  grid: "Grid",
  animations: "Анімації",
  "js-basics": "Основи JavaScript",
  dom: "DOM",
  async: "Асинхронність",
  oop: "Об'єктно-орієнтоване програмування",
  functional: "Функціональне програмування",
  patterns: "Патерни",
  architecture: "Архітектура",
  "static-typing": "Статична типізація",
  generics: "Універсальні типи",
  "type-safe": "Безпечна типізація",
  components: "Компоненти",
  hooks: "Hooks",
  routing: "Маршрутизація",
  state: "Стан",
  context: "Контекст",
  render: "Рендеринг",
  performance: "Оптимізація продуктивності",

  // Practical
  nocode: "Сайти без коду",
  markup: "Верстка сайтів",
  "landing-pages": "Лендінги",
  "school-course": "Шкільний курс",
  "semantic-structure": "Семантична структура",
  seo: "SEO",
  layouts: "Макети",
  "visual-styling": "Візуальний стиль",
  responsive: "Адаптивність",
  "interactive-ui": "Інтерактивні інтерфейси",
  "interactive-web": "Інтерактивний веб",
  "simple-apps": "Прості додатки",
  "mini-games": "Міні-ігри",
  apps: "Застосунки",
  "event-loop": "Event loop",
  "large-apps": "Великі застосунки",
  testing: "Тестування",
  debugging: "Дебаг",
  refactoring: "Рефакторинг",
  "ts-in-react": "TypeScript у React",
  libs: "Бібліотеки",
  spa: "Single Page App",
  dashboards: "Дашборди",
  "client-side": "Клієнтська логіка",
  optimization: "Оптимізація",
  "real-products": "Реальні продукти",
  "clean-architecture": "Чиста архітектура",

  // Professional
  "prep-js": "Підготовка до JS",
  "html-pro": "HTML Pro",
  "frontend-pro": "Frontend Pro",
  "js-foundation": "Основи JS",
  "js-pro": "Професійний JS",
  "ts-pro": "TS Pro",
  "frontend-frameworks": "Фреймворки фронтенду",
  "senior-prep": "Підготовка до Senior",
  frameworks: "Фреймворки",

  // Audience
  students: "Студенти",
  designers: "Дизайнери",
  school: "Школярі",
  "junior-devs": "Junior розробники",
  "middle-devs": "Middle розробники",
  "advanced-devs": "Досвідчені розробники",
  "new-devs": "Початківці в ІТ",
  freelancers: "Фрілансери",
  "team-leads": "Тімліди",

  // Tags
  "self-study": "Курс для самостійного навчання",
  "tech-base": "Технічна база",
  intensive: "Інтенсив",
  "real-projects": "Реальні проєкти",
  interview: "Підготовка до співбесід",
  "deep-dive": "Глибоке занурення",
  "robust-code": "Надійний код",
  "type-safety": "Типобезпека",
  "react-core": "Ядро React",
  "react-pro": "Професійний React",
  "advanced-hooks": "Просунуті хуки",
};

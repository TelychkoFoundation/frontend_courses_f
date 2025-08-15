export interface IService {
  id: string;
  title: string;
  short: string;
  description: string;
  price: string;
  cta: {
    label: string;
    href: string;
  };
}

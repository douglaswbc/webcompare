
export interface Plan {
  id: string;
  provider: string;
  providerLogo?: string;
  name: string;
  downloadSpeed: string;
  uploadSpeed: string;
  price: string;
  period: string;
  subtitle: string;
  description?: string;
  bannerImage: string;
  badge?: {
    text: string;
    icon: string;
    colorClass: string;
    textClass: string;
  };
  specs: {
    connectionType: string;
    dataLimit: string;
    contract: string;
  };
  benefits: Array<{
    text: string;
    icon: string;
  }>;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface Provider {
  name: string;
  type: string;
  logo: string;
  logoClass?: string;
}

export interface UserAddress {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero: string;
}

export interface UserPersonalData {
  nome: string;
  telefone: string;
  cpf: string;
  rg: string;
}

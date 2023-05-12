export interface PostProps {
  title: string;
  description: string;
  linkImage: string;
  date: string;
  author: {
    name: string;
    prenume: string;
  };
  id: number;
}

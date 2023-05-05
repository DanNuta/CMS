export interface PostProps {
  title: string;
  description: string;
  linkImage: string;
  date: string;
  author: {
    name: string | undefined;
    prenume: string | undefined;
  };
  id: number;
}

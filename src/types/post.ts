export interface PostProps {
  title: string | undefined;
  description: string | undefined;
  linkImage: string | undefined;
  date: string | undefined;
  author: {
    name: string | undefined;
    prenume: string | undefined;
  };
  id: number;
}

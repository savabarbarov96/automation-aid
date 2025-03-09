
interface BlogPostsEmptyProps {
  isLoading: boolean;
}

export const BlogPostsEmpty = ({ isLoading }: BlogPostsEmptyProps) => {
  if (isLoading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  return <div className="text-center py-10">Няма публикации. Създайте първата.</div>;
};

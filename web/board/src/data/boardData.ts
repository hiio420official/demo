// 생성 날짜: 2024-09-16
// 게시판 더미 데이터

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
  likes: number;
}

// 더미 데이터 생성
const generateDummyPosts = (): Post[] => {
  const posts: Post[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    posts.push({
      id: i,
      title: `게시글 제목 ${i}`,
      content: `이것은 게시글 ${i}의 내용입니다. 더미 데이터로 생성된 내용입니다. 이 게시글은 테스트 목적으로 만들어졌습니다.`,
      author: `작성자${i % 5 + 1}`,
      createdAt: date.toISOString(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
    });
  }
  
  // 최신 게시글이 먼저 보이도록 정렬
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const dummyPosts = generateDummyPosts(); 
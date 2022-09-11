import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PostCard from "../../components/PostCard";
import Post from "../post";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export async function getServerSideProps() {
  const data: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=1"
  ).then((res) => res.json());
  return {
    props: {
      posts: data,
    },
  };
}

function Posts({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [postData, setPostData] = useState<Post[]>(posts);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(false);
  const [lastIntersecting, setLastIntersecting] =
    useState<HTMLDivElement | null>(null);

  const updatePost = async () => {
    setIsLoading(true);
    const data: Post[] = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`
    ).then((res) => res.json());
    setPostData((prev) => [...prev, ...data]);
    setIsLoading(false);
  };

  //observer 콜백함수
  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        updatePost();
        setCurrentPage((prev) => prev + 1);
        // 현재 타겟을 unobserve한다.
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer: IntersectionObserver;
    if (lastIntersecting) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(randomImageList 배열의 마지막 아이템)으로 지정
      observer.observe(lastIntersecting);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersecting]);

  if (!postData) return <div>...로딩중</div>;

  return (
    <Container>
      {postData.map((post, idx) => {
        return (
          <PostCard
            key={idx}
            title={post.title}
            body={post.body}
            num={idx + 1}
          ></PostCard>
        );
      })}
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        <InterSection ref={setLastIntersecting}></InterSection>
      )}
    </Container>
  );
}

export default Posts;

const Container = styled.div``;

const InterSection = styled.div`
  background-color: red;
  height: 3rem;
  width: 100%;
`;

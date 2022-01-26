const commentsMock = [
  {
    text: "Hello World!",
    date: "2022-01-04T18:49:21.392Z",
    score: 5,
  },
  {
    text: "Hello Foo!",
    date: "2015-01-10T18:49:21.392Z",
    score: 10,
  },
  {
    text: "Hello Bar!",
    date: "2021-06-04T18:49:21.392Z",
    score: -10,
  },
];

export type ScoreResponse = {
  text: string;
  date: string;
  score: number;
}

export function getComments(): Promise<ScoreResponse[]> {
  return Promise.resolve(commentsMock);
}

import ForumItemFc, { ForumItem } from "../Forum/Forum";

const forumData: ForumItem[] = [
  {
    id: 1,
    title: "How to Create an Effective Design System for Your Team?",
    status: "Completed",
    category: "Bug",
    date: "2 days ago",
    commentsCount: 1,
    upvotes: 7,
    fire: true,
  },
  {
    id: 2,
    title: "Best Practices in UI Design: Tips and Tricks",
    status: "Completed",
    category: "Bug",
    date: "Apr 14",
    commentsCount: 5,
    upvotes: 3,
  },
  {
    id: 3,
    title:
      "The Impact of Design Systems on Brand Identity: Examples and Case Studies",
    status: "Completed",
    category: "Readings",
    date: "Mar 17",
    commentsCount: 3,
    upvotes: 5,
    fire: true,
  },
  {
    id: 4,
    title: "Design Trends 2024: What's the Future Holding?",
    status: "To-do",
    category: "Bug",
    date: "Mar 05",
    commentsCount: 0,
    upvotes: 8,
  },
];

const ForumContainer = () => {
  return (
    <div className="mb-20">
      <h1 className="flex flex-col text-3xl md:text-5xl font-bold text-blue-500 dark:text-stext-dark mb-8 font-outfit text-center group">
        💭 Son Forumlar
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
      </h1>
      <div className="p-4 bg-white dark:bg-background-darkAlt3 shadow-md rounded-lg">
        {forumData.map((item) => (
          <ForumItemFc key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForumContainer;

import UserCard from "./UserCard";

const App = () => (
  <>
    <UserCard name="John Doe" age={25} isOnline={true} />
    <UserCard name="Jane Doe" age={22} isOnline={false} />
    <UserCard name="Foo Bar" age={30} isOnline={true} />
  </>
);

export default App;
